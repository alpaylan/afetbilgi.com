
from __future__ import annotations
from abc import ABC, abstractmethod
import re

from Column import Column
from Table import Table

class Request(ABC):
    pass

class NewTableSchemaRequest(Request):
    def __init__(self, table_name: str, columns: list[tuple[str, str]]):
        self.table = Table(table_name, columns)
        

class NewEntryRequest(Request):
    def __init__(self, table_name: str, entry: list[str]):
        self.table_name = table_name
        self.entry = entry

