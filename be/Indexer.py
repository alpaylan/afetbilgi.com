from __future__ import annotations
import pandas as pd

class Indexer:
    def __init__(self, levels: list[str, str], transform_data: callable):
        self._levels = levels
        self.transform_data = transform_data

    def finished(self) -> bool:
        return len(self._levels) == 0
    
    def question(self) -> str:
        return self._levels[0][1]
    
    def levels(self) -> list[tuple[str, str]]:
        return self._levels
    
    def index(self) -> tuple[str, str]:
        return self._levels[0][0]
    
    def next_level(self) -> Indexer:
        return Indexer(self._levels[1:], self.transform_data)
    
    def transform_data(self, data: pd.DataFrame) -> dict:
        return self.transform_data(data)
    
    def __str__(self) -> str:
        return str(self._levels)
    


