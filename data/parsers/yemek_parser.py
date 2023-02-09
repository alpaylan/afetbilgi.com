
import pandas as pd
import json
from utils.functions import turkish_title


def main():
    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Yemek"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/yemek.json"
    df = pd.read_csv(url, encoding="utf-8")

    unique_cities = df['İl'].unique()

    for city in unique_cities:
        city_df = df[df['İl'] == city]
        unique_ilce = city_df['İlçe'].unique()
        



if __name__ == "__main__":
    main()
