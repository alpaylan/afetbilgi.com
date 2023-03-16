
from Requests import *
from Column import Column
from Table import Table

import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key, Attr

class Interface:
    def __init__(self) -> None:
        # Setup connection to dynamodb via 
        self.dynamo = boto3.client('dynamodb', region_name='us-east-1')
        self.all_table_names = self.dynamo.list_tables()['TableNames']
        self.all_table_names.remove('tables')
        self.ind_table_names = list(set(map(lambda name: name.split('-')[0], self.all_table_names)))
        self.tables = self.dynamo.scan(TableName='tables')['Items']

    def request(self, req: Request) -> bool:
        match req:
            case NewTableSchemaRequest():
                return self.handle_new_table_request(req)
            case NewEntryRequest():
                return self.handle_new_entry_request(req)
            case UpdateEntryRequest():
                return self.handle_update_entry_request(req)
            case GetTableEntriesRequest():
                return self.handle_get_table_entries_request(req)
            case GetTableSchemaRequest():
                return self.handle_get_table_schema_request(req)
            case GetAllDataRequest():
                return self.handle_get_all_data_request(req)
            case _:
                return False


    def get_latest_table_version(self, table_name: str) -> None | int:
        table_names = map(lambda name: tuple(name.split('-')), self.all_table_names)
        latest_table_versions = {}
        for name, version in table_names:
            if name not in latest_table_versions or version > latest_table_versions[name]:
                latest_table_versions[name] = version
        if table_name not in latest_table_versions:
            return None
        else:
            return int(latest_table_versions[table_name])



    def handle_new_table_request(self, req: NewTableSchemaRequest) -> bool:
        version = self.get_latest_table_version(req.table_name)
        if version is None:
            version = 0
        else:
            version = version + 1

        table_name = f"{req.table_name}-{version}"
        self.dynamo.create_table(
            TableName=table_name,
            KeySchema=req.key_schema,
            AttributeDefinitions=req.attribute_definitions,
            ProvisionedThroughput=req.provisioned_throughput
        )
        self.dynamo.put_item(
            TableName='tables',
            Item={
                'table_name': { 'S' : table_name },
                'version': { 'N' : str(version) },
                'columns': {"S": json.dumps(list(map(lambda column: {"field_name": column[0], "field_type": column[1]}, req.columns)))}
            }
        )
        return True


    def handle_new_entry_request(self, req: NewEntryRequest) -> bool:
        version = self.get_latest_table_version(req.table_name)
        if version is None:
            return False
        table_name = f"{req.table_name}-{version}"
        
        item = {
            "id": { "S": str(uuid.uuid4()) },
            "version": { "N": "0" }
        }

        for column in self.get_table(table_name).columns:
            item[column.name] = { "S" : req.entry[column.name] }

        print(item)
        self.dynamo.put_item(
            TableName=table_name,
            Item=item
        )

        return True

    def get_table(self, table_name: str) -> Table:
        table = next(filter(lambda table: table['table_name']['S'] == table_name, self.tables))
        columns = json.loads(table['columns']['S'])
        print(columns)
        return Table(table_name, columns)
        
    
    def handle_update_entry_request(self, req: UpdateEntryRequest) -> bool:
        version = self.get_latest_table_version(req.table_name)
        if version is None:
            return False
        table_name = f"{req.table_name}-{version}"
        
        version = self.get_latest_item_version(table_name, req.id)
        if version is None:
            return False
        
        item = {
            "id": { "S": req.id },
            "version": { "N": str(version + 1) }
        }

        for column in self.get_table(table_name).columns:
            item[column.name] = { "S" : req.entry[column.name] }

        print(item)
        self.dynamo.put_item(
            TableName=table_name,
            Item=item
        )

        return True

    def get_latest_item_version(self, table_name: str, id: str) -> None | int:
        print(table_name, id)
        print(Key('id').eq(id))
        response = self.dynamo.query(
            TableName=table_name,
            ExpressionAttributeValues={
                ':id': {
                    'S': id
                },
            },
            KeyConditionExpression='id = :id',
            ScanIndexForward=False,
            Limit=1
        )
        if response['Count'] == 0:
            return None
        else:
            return int(response['Items'][0]['version']['N'])

    def handle_get_table_entries_request(self, req: GetTableEntriesRequest) -> dict[str, dict]:
        version = self.get_latest_table_version(req.table_name)
        if version is None:
            return False
        table_name = f"{req.table_name}-{version}"
        
        response = self.dynamo.scan(TableName=table_name)
        entries = {}
        # Get latest versions
        for item in response['Items']:
            if item['id']['S'] not in entries\
                or int(item['version']['N']) > int(entries[item['id']['S']]['version']['N']):
                entries[item['id']['S']] = item

        # Remove version
        for entry in entries.values():
            del entry['version']        
            del entry['id']

        # Inline types

        for entry in entries.values():
            for column in self.get_table(table_name).columns:
                entry[column.name] = entry[column.name]['S']

        return entries
    

    def handle_get_table_schema_request(self, req: GetTableSchemaRequest) -> dict[str, str]:
        version = self.get_latest_table_version(req.table_name)
        if version is None:
            return False
        table_name = f"{req.table_name}-{version}"
        return self.get_table(table_name).columns

    def handle_get_all_data_request(self, _: GetAllDataRequest) -> dict[str, dict[str, dict]]:
        tables = {}
        for table_name in self.ind_table_names:
            print(table_name)
            tables[table_name] = self.handle_get_table_entries_request(GetTableEntriesRequest(table_name))
        return tables
