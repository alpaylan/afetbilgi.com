
from Column import Column
from Table import Table
from Requests import Request, NewTableSchemaRequest, NewEntryRequest
from Interface import Interface
from DataTree import DataTree
from Indexer import Indexer
from DataType import ContainerPharmacyList

import pandas as pd
from io import StringIO


def test1():
    interface = Interface()
    interface.request(
        NewTableSchemaRequest(
            "test", 
            [("name", "text"), ("phone", "phone_number") , ("address", "text")]
        )
    )

    interface.request(NewEntryRequest("test", ["Ahmet", "555-555-5555", "123 Main St"]))
    interface.request(NewEntryRequest("test", ["Mehmet", "555-555-5555", "123 Main St"]))
    interface.request(NewEntryRequest("test", ["Ahmet", "333-333-3333", "124 Main St"]))
    interface.request(NewEntryRequest("test", ["Mehmet", "333-333-3333", "124 Main St"]))
    interface.request(NewEntryRequest("test", ["Ahmet", "111-111-1111", "125 Main St"]))
    interface.request(NewEntryRequest("test", ["Mehmet", "111-111-1111", "125 Main St"]))
    interface.request(NewEntryRequest("test", ["Ahmet", "222-222-2222", "126 Main St"]))
    interface.request(NewEntryRequest("test", ["Mehmet", "222-222-2222", "128 Main St"]))



    print(interface.get_table("test").get_entries())
    csv = interface.get_table("test").get_csv()
    df = pd.read_csv(StringIO(csv))
    
    # interface.get_table("test").import_csv(StringIO(csv))

    indexer = Indexer([("name", "What is your name?")], lambda data: data.to_dict(orient="records"))

    datatree = DataTree(df, indexer)    
    print(datatree.to_json())

def test2():
    interface = Interface()
    interface.request(
        NewTableSchemaRequest(
            "eczane",
            [
                ("Şehir", "text"),
                ("İlçe", "text"),
                ("Konum", "text"),
                ("Konum Linki", "link")
            ]
        )
    )

    interface.get_table("eczane").import_csv("eczane.csv")


    indexer = Indexer([("Şehir", "What is your city?"), ("İlçe", "What is your district?")], ContainerPharmacyList)

    csv = interface.get_table("eczane").get_csv()
    df = pd.read_csv(StringIO(csv))

    datatree = DataTree(df, indexer)

    print(datatree.to_json())




if __name__ == "__main__":
    
    test1()
    # test2()



