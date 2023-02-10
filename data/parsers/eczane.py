import sys
import json
import pandas as pd
from urllib.parse import urlencode

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    query = urlencode({"sheet": "Konteynır Eczane", "tqx": "out:csv"})

    df = pd.read_csv(f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?{query}", encoding="utf-8", header=None)

    dps = []
    first = True

    for _, row in df.iterrows():
        if first:
            first = False
            continue

        dps.append({
            "city": row[0].strip(),
            "district": row[1].strip(),
            "location": row[2].strip(),
            "locationLink": row[3].strip(),
        })

    data = {
        "type": "data",
        "data": {
            "dataType": "container-pharmacy",
            "items": dps,
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()