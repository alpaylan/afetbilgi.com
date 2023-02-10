import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title

class VeterinerParser(BaseMapParser):

    @classmethod
    async def parse(cls):
        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "Veterinerler"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

        df = pd.read_csv(url, encoding="utf-8")
        df.fillna("")
        veterinerler = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Konum Linki'])
            if not coor:
                return
            veterinerler.append(
                {
                    "name": row["İsim"] if not pd.isna(row["İsim"])  else None,
                    "phone_number": row["Telefon"] if not pd.isna(row["Telefon"]) else None,
                    "address": row["Konum"] if not pd.isna(row["Konum"]) else None,
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-data-vet",
            "data": veterinerler,
        }
