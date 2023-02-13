import sys
import os
import json
import pandas as pd

from utils.functions import turkish_title

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open(
        f"{os.path.realpath(os.path.dirname(__file__))}/utils/il_translate.json").read())
    
    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Eczaneler"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding=("utf-8"))
    df = df.fillna("")

    df["ŞEHİR"] = df["ŞEHİR"].apply(str.strip)
    df["ŞEHİR"] = df["ŞEHİR"].apply(turkish_title)
    df["İLÇE"] = df["İLÇE"].apply(str.strip)
    df["İLÇE"] = df["İLÇE"].apply(turkish_title)
    

    df = df.sort_values(["ŞEHİR", "İLÇE"])

    unique_cities = df["ŞEHİR"].unique()
    options_1 = []

    for city in unique_cities:
        city_df = df[df["ŞEHİR"] == city]
        unique_counties = city_df["İLÇE"].unique()
        date = city_df["TARİH"].iloc[0]

        county_dict = {}

        for county in unique_counties:
            county_dict[county] = []

        for _, row in city_df.iterrows():
            county_dict[row["İLÇE"]].append({
                "name": row["ECZANE İSMİ"],
                "address": row["ADRES"],
                "phone": [tel for tel in row["İLETİŞİM"].split("\n")],
                "locationLink": row["KONUM LİNKİ"],
            })

        option_2 = []
        for k, v in county_dict.items():
            option_2.append({
                "name": k,
                "value": {
                    "type": "data",
                    "data": {
                        "dataType": "local-pharmacy-list",
                        "city": city,
                        "county": k,
                        "date": date,
                        "items": v
                    }
                }
            })

        options_1.append({
            "name": city,
            "value": {
                "type": "question",
                "text_tr": f"{city_translation[city]['tr']} şehrinde hangi ilçeside açık eczaneleri arıyorsunuz?",
                "text_en": f"Which county in {city_translation[city]['en']} are you looking for open pharmacies?",
                "text_ar": f"أي مقاطعة في {city_translation[city]['ar']} تبحث عن صيدليات مفتوحة؟",
                "text_ku": f"Çima kuştê di {city_translation[city]['ku']} de ku şînî şînên xwe?",
                "options": option_2
            }
        })

    data = {
        "type": "question",
        "autocompleteHint_tr": "Şehir",
        "autocompleteHint_en": "City",
        "autocompleteHint_ar": "مدينة",
        "autocompleteHint_ku": "Bajar",
        "text_tr": "Hangi şehirde açık eczaneleri arıyorsunuz?",
        "text_en": "Which city are you looking for open pharmacies?",
        "text_ar": "أي مدينة تبحث عن صيدليات مفتوحة؟",
        "text_ku": "Çima bajarê ku şînî şînên xwe?",
        "options": options_1
    }

    with open(out_path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()