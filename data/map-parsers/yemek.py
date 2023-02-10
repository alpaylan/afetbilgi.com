import asyncio
import pandas as pd

from base_map_parser import BaseMapParser
from utils.functions import turkish_title

class YemekParser(BaseMapParser):

    @classmethod
    async def parse(cls):

        sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
        sheet_name = "Yemek"
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

        df = pd.read_csv(url, encoding="utf-8")
        df.fillna("", inplace=True)
        yemek_noktalari = []

        async def process_row(row):
            coor = await cls.get_coordinates(row['Google Maps Linki'])
            if not coor:
                return
            yemek_noktalari.append(
                {
                    "city": turkish_title(row['İl'].strip()),
                    "county": turkish_title(row['İlçe'].strip()),
                    "name": row["Lokasyon"] if not pd.isna(row["Lokasyon"]) else None,
                    "maps_url": row["Google Maps Linki"] if not pd.isna(row["Google Maps Linki"]) else None,
                    "url": row["Anons Linki"] if not pd.isna(row["Anons Linki"]) else None,
                    "phone_number": row["Telefon"] if not pd.isna(row["Telefon"]) else None,
                    "updated_at_date": row["Teyit Tarih"] if not pd.isna(row["Teyit Tarih"]) else None,
                    "updated_at_time": row["Teyit Saati"] if not pd.isna(row["Teyit Saati"]) else None,
                    "latitude": coor[0],
                    "longitude": coor[1],
                }
            )

        await asyncio.gather(*[process_row(row) for _, row in df.iterrows()])

        return {
            "type": "map-food-items",
            "data": yemek_noktalari,
        }
