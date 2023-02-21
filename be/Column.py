
from __future__ import annotations
from abc import ABC
from abc import abstractmethod

import re
import validators


class Column(ABC):
    def __init__(self, name: str) -> None:
        super().__init__()
        self.name = name

    def validate(self, value) -> bool:
        return True
    
    @staticmethod
    def mkColumn(column: tuple[str, str]) -> Column:
        column_dict = {
            "text": TextColumn,
            "link": LinkColumn,
            "phone_number": PhoneNumberColumn
        }
        return column_dict[column[1]](column[0])
    
class TextColumn(Column):
    def __init__(self, name: str) -> None:
        super().__init__(name)
        self.type = "text"
        
class LinkColumn(Column):
    def __init__(self, name: str) -> None:
        super().__init__(name)
        self.type = "link"
    
    def validate(self, value) -> bool:
        # return True if value is a valid link
        # valid_url_regex = "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$"
        # return re.match(valid_url_regex, value) is not None
        return validators.url(value)
    
class PhoneNumberColumn(Column):
    def __init__(self, name: str) -> None:
        super().__init__(name)
        self.type = "phone_number"
    
    def validate(self, value) -> bool:
        valid_phone_number_regex = "^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$"
        for phone_number in value.split("\n"):
            if re.match(valid_phone_number_regex, phone_number) is None:
                return False
        return True


