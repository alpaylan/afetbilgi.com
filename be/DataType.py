from abc import ABC, abstractmethod
from dataclasses import dataclass, field

import pandas as pd

class PageType(ABC):
    def __init__(self, type: str) -> None:
        self.type = type

    @abstractmethod
    def __str__(self) -> str:
        pass
    

class ContainerPharmacyList(PageType):
    type: str = "pharmacy"

    def __init__(self, items: pd.DataFrame) -> None:
        super().__init__(self.type)

        self.items = tuple([
            {"address": item["Konum"], "maps_link": item["Konum Linki"]} for _, item in items.iterrows( )
        ])

    def __str__(self) -> str:
        return f"ContainerPharmacyList: {self.items}"

