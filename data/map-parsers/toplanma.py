import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title

class ToplanmaParser(BaseMapParser):

    @classmethod
    async def parse(cls):
        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "G%C3%BCvenli%20Toplanma%20Alanlar%C4%B1"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

        df = pd.read_csv(url, encoding="utf-8")
        df.fillna("", inplace=True)
        toplanma_noktaliari = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Maps Linki'])
            if not coor:
                return
            toplanma_noktaliari.append(
                {
                    "city": turkish_title(row['Şehirler'].strip()),
                    "name": row['Konum'].strip() if not pd.isna(row['Konum'])  else None,
                    "source": row['Kaynak'].strip() if not pd.isna(row['Kaynak']) else None,
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-gathering-list",
            "data": toplanma_noktaliari,
        }
