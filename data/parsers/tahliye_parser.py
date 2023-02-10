import pandas as pd
import json
import sys

from utils.functions import turkish_title

def main():

    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open("./utils/il_translate.json").read())
    
    
    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Tahliye%20Noktas%C4%B1%20Adresleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")


    tahliye_noktalari = []

    for _, row in df.iterrows():
        tahliye_noktalari.append(
            {
                "city": turkish_title(row['Şehir'].strip()),
                "county": turkish_title(row['İlçe'].strip()),
                "name": row['İsim'],
                "map_link": row['Maps Linki'],
                "address": row['Adres'],
                "contacts": [x.strip() for x in row['Telefon'].split("\n")],
                "validator": row['Teyit Merci'],
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "tahliye-noktalari",
            "items": tahliye_noktalari
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()