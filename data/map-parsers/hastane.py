import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title

class ToplanmaParser(BaseMapParser):

    @classmethod
    async def parse(cls):
        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "Sahra%20Hastaneleri"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

        df = pd.read_csv(url, encoding="utf-8")
        df.fillna("", inplace=True)
        hastaneler = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Google Maps Linki'])
            if not coor:
                return
            hastaneler.append(
                {
                    "city": turkish_title(row['İl'].strip()),
                    "county": turkish_title(row['İlçe'].strip()),
                    "name": row['Lokasyon'].strip() if not pd.isna(row['Lokasyon'])  else None,
                    "source": row['Anons Linki'].strip() if not pd.isna(row['Anons Linki']) else None,
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-hospital-list",
            "data": hastaneler,
        }
