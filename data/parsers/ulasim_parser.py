import pandas as pd
import json
import sys

from utils.functions import turkish_title

def main():

    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)
    
    out_path = sys.argv[1]

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Ula%C5%9F%C4%B1m"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    transportations = []

    for _, row in df.iterrows():

        transportations.append(
            {
                "name": turkish_title(row["Şirket/Kampanya İsmi"]),
                "url": row["Link"],
                "validation_type": row["Doğrulanma Yöntemi"],
                "validation_date": row["Doğrulama Tarihi"],
                "description": row["Açıklama"],
                "validity-date": row["Geçerlilik Tarihi"],
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "transportations",
            "transportations": transportations
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    


if __name__ == "__main__":
    main()