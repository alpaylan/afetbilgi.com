import sys
import json
import pandas as pd

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Afet%20B%C3%B6lgesi%20D%C4%B1%C5%9F%C4%B1ndaki%20%C5%9Eehirlerdeki%20Hizmetler"

    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    services = []


    for _, row in df.iterrows():

        services.append(
            {
                "city": row["İl"].strip(),
                "county": row["İlçe"].strip(),
                "location": row["Lokasyon"].strip(),
                "locationLink": row["Google Maps Linki"].strip(),
                "category": row["Servis Kategorisi"].strip(),
                "specificCategory": row["Spesifik Servis Tipi"].strip(),
                "source": row["Anons Linki"].strip(),
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "services",
            "services": services
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()