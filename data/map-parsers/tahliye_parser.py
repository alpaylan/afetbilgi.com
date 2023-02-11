import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title

class TahliyeParser(BaseMapParser):

    @classmethod
    async def parse(cls):
        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "Tahliye%20Noktas%C4%B1%20Adresleri"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

        df = pd.read_csv(url, encoding="utf-8")
        df.fillna("", inplace=True)
        evacuationPoints = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Maps Linki'])
            if not coor:
                return
            evacuationPoints.append(
                {
                    "city": turkish_title(row['Şehir'].strip()),
                    "county": turkish_title(row['İlçe'].strip()),
                    "name": row['İsim'].strip() if not pd.isna(row['İsim'])  else None,
                    "source": row['Teyit Merci'].strip() if not pd.isna(row['Teyit Merci']) else None,
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-evacuation-points",
            "data": evacuationPoints,
        }
