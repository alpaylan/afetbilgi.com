import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title


class BarinmaParser(BaseMapParser):

    @classmethod
    async def parse(cls):
        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "Ge%C3%A7ici%20Bar%C4%B1nma%20Alanlar%C4%B1"
        sheet_gid = "2029961498"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={sheet_gid}"

        df = pd.read_csv(url, encoding="utf-8")

        df.fillna("", inplace=True)

        get_data = lambda x: x if not pd.isna(x) else None
        barinma_noktalari = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Konum linki'])
            if not coor:
                return
            barinma_noktalari.append(
                {
                    "city": turkish_title(row['Şehir'].strip()),
                    "name": get_data(row['Lokasyon']),

                    # TODO: Add back after data migration, this is a temporary fix
                    # "is_validated": get_data(row["Doğrulanma Durumu"]) == "Doğrulandı",

                    "url": get_data(row['Link']),
                    "validation_date": get_data(row['Doğrulanma Tarihi']),
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-city-accommodation",
            "data": barinma_noktalari,
        }
