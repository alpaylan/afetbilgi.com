
from Requests import Request, NewTableSchemaRequest, NewEntryRequest
from Column import Column
from Table import Table



class Interface:
    def __init__(self) -> None:
        self.tables: dict[str, Table] = {}

    def request(self, req: Request) -> bool:
        match req:
            case NewTableSchemaRequest():
                return self.handle_new_table_request(req)
            case NewEntryRequest():
                return self.handle_new_entry_request(req)
            case _:
                return False


    def handle_new_table_request(self, req: NewTableSchemaRequest) -> bool:
        self.tables[req.table.table_name] = req.table
        return True

    def handle_new_entry_request(self, req: NewEntryRequest) -> bool:
        table = self.tables[req.table_name]
        table.add_entry(req.entry)
        return True

    def get_table(self, table_name: str) -> Table:
        return self.tables[table_name]
    
    




