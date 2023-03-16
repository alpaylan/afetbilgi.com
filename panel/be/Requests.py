
from __future__ import annotations
from abc import ABC, abstractmethod
import re
import uuid

from Column import Column
from Table import Table

class Request(ABC):
    pass

class NewTableSchemaRequest(Request):
    def __init__(self, table_name: str, columns: list[tuple[str, str]]):
        self.table_name = table_name
        self.key_schema = [
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'
            },
            {
                'AttributeName': 'version',
                'KeyType': 'RANGE'
            }
        ]
        self.attribute_definitions = [
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'version',
                'AttributeType': 'N'
            }
        ]
        self.provisioned_throughput = {
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
        self.columns = columns
        

class NewEntryRequest(Request):
    def __init__(self, table_name: str, entry: dict[str, str]):
        self.table_name = table_name
        self.entry = entry

class UpdateEntryRequest(Request):
    def __init__(self, table_name: str, id: uuid.uuid4, entry: dict[str, str]):
        self.table_name = table_name
        self.entry = entry
        self.id = id

