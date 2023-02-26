import pandas as pd
import json

from Indexer import Indexer


class DataTree:
    def __init__(self, data: pd.DataFrame, indexer: Indexer):
        self.data_tree = self.treeify(data, indexer)

    def treeify(self, data: pd.DataFrame, indexer: Indexer) -> dict:
        if indexer.finished():
            return indexer.transform_data(data)
        
        tree = {
            "question": indexer.question(),
            "options": []
        }

        index = indexer.index()
        if index not in data.columns:
            raise Exception("Indexer not found in data")
        option_names = data[index].unique()
        for option_name in option_names:
            option_data = data[data[index] == option_name]
            option_data = option_data.drop(index, axis=1, inplace=False)
            tree["options"].append({
                "name": option_name,
                "data": self.treeify(option_data.copy(), indexer.next_level())
            })
        return tree


    def __str__(self) -> str:
        return str(self.data_tree)


    def to_json(self) -> str:
        return json.dumps(self.data_tree, indent=4, default=lambda o: o.__dict__)