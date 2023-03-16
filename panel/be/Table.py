from __future__ import annotations
from abc import ABC, abstractmethod
import pandas as pd
import numpy as np

from Column import Column

class Table:
    def __init__(self, table_name: str, columns: list[dict[str, str]]) -> None:
        self.table_name = table_name
        self.columns: list[Column] = list(map(lambda c: Column.mkColumn(c), columns))

    def validate(self, entry: list[str]) -> bool:
        return all(True if value is np.nan else column.validate(value) for column, value in zip(self.columns, entry))
    
    def get_column(self, column_name: str) -> Column:
        return next(column for column in self.columns if column.name == column_name)
    
    def get_column_index(self, column_name: str) -> int:
        return self.columns.index(self.get_column(column_name))

    def import_csv(self, csv: str) -> None:
        df = pd.read_csv(csv)
        # validate columns
        if len(df.columns) != len(self.columns):
            raise Exception("Invalid CSV")
        

        for column in self.columns:
            if column.name not in df.columns:
                print(column.name)
                raise Exception("Invalid CSV")
        

        content = []
        # validate entries
        for entry in df.values.tolist():
            if not self.validate(entry):
                print(entry)
                raise Exception("Invalid CSV")
            
            # if validated, add to content
            content.append(entry)

        entries = []
        for entry in content:
            entries.append(dict(zip(df.columns, entry)))

        return entries
    


