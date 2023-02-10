import asyncio
import pandas as pd
from urllib.parse import urlencode


from base_map_parser import BaseMapParser
from utils.functions import turkish_title


class EczaneParser(BaseMapParser):

    @classmethod
    async def parse(cls):

        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        query = urlencode({"sheet": "Konteynır Eczane", "tqx": "out:csv"})

        df = pd.read_csv(f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?{query}", encoding="utf-8", header=None)

        eczaneler = []

        async def process_row(row):
            coor = await cls.get_coordinates(row[3])
            if not coor:
                return
            eczaneler.append(
                {
                    "city": row[0],
                    "district": row[1],
                    "location": row[2],
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-container-pharmacy",
            "data": eczaneler,
        }
