from __future__ import annotations
from abc import ABC, abstractmethod
import pandas as pd
import numpy as np

from Column import Column

class Table:
    def __init__(self, table_name: str, columns: list[tuple[str, str]]) -> None:
        self.table_name = table_name
        self.columns: list[Column] = list(map(lambda c: Column.mkColumn(c), columns))
        self.content: list[list[str]] = []

    def validate(self, entry: list[str]) -> bool:
        return all(True if value is np.nan else column.validate(value) for column, value in zip(self.columns, entry))

    def add_entry(self, entry: list[str]) -> None:
        if self.validate(entry):
            self.content.append(entry)
        else:
            raise Exception("Invalid entry")
    
    def get_column(self, column_name: str) -> Column:
        return next(column for column in self.columns if column.name == column_name)
    
    def get_column_index(self, column_name: str) -> int:
        return self.columns.index(self.get_column(column_name))
    
    def get_column_values(self, column_name: str) -> list[str]:
        return [entry[self.get_column_index(column_name)] for entry in self.content]

    def get_column_values_as_set(self, column_name: str) -> set[str]:
        return set(self.get_column_values(column_name))

    def get_entries(self) -> list[list[str]]:
        return self.content
    

    def get_csv(self) -> str:
        df = pd.DataFrame(self.content, columns=[column.name for column in self.columns])
        return df.to_csv(index=False)
    

    def import_csv(self, csv: str) -> None:
        df = pd.read_csv(csv)
        # validate columns
        print(df.columns)
        print(self.columns)
        if len(df.columns) != len(self.columns):
            raise Exception("Invalid CSV")
        

        for column in self.columns:
            if column.name not in df.columns:
                print(column.name)
                raise Exception("Invalid CSV")
        
        # validate entries
        for entry in df.values.tolist():
            if not self.validate(entry):
                print(entry)
                raise Exception("Invalid CSV")
            
            # if validated, add to content
            self.content.append(entry)

    


