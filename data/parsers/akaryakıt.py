import sys
import json
import pandas as pd
import os

from utils.functions import turkish_title


def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)


    out_path = sys.argv[1]

    city_translation = json.loads(open(
        f"{os.path.realpath(os.path.dirname(__file__))}/utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Akaryak%C4%B1t"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding=("utf-8"))

    df = df.fillna("")

    df["İL"] = df["İL"].apply(str.strip)
    df["İL"] = df["İL"].apply(turkish_title)

    df["İLÇE"] = df["İLÇE"].apply(str.strip)
    df["İLÇE"] = df["İLÇE"].apply(turkish_title)

    df = df.sort_values(["İL", "İLÇE"])

    unique_cities = df["İL"].unique()
    options_1 = []

    for city in unique_cities:
        city_df = df[df["İL"] == city]
        unique_counties = city_df["İLÇE"].unique()
        county_dict = {}

        for county in unique_counties:
            county_dict[county] = []

        for _, row in city_df.iterrows():
            if row["Konum Teyit"].strip().lower() == "evet":
                county_dict[row["İLÇE"]].append(
                    {
                        "name": row["İSTASYON ADI"].strip(),
                        "address": row["ADRES"].strip(),
                        "telephone": row["TELEFON"].strip(),
                        "maps_link": row["KONUM"].strip(),
                        "info": row["Açıklama (Hangi akaryakıt bulunuyor)"].strip(),
                    }
                )

        option_2 = []
        for k, v in county_dict.items():
            option_2.append(
                {
                    "name": k,
                    "value": {
                        "type": "data",
                        "data": {
                            "dataType": "gas_stations",
                            "city": city,
                            "county": k,
                            "items": v,
                        }
                    }
                }
            )

        options_1.append(
            {
                "name": city,
                "value": {
                    "type": "question",
                    "text_tr": f"{city_translation[city]['tr']}indeki açık akaryakıt istasyonlarını görmek istediğiniz ilçeyi seçiniz.",
                    "text_en": f"Select the county in which you want to see the open gas stations in {city_translation[city]['en']}.",
                    "text_ku": f"Navçeya ku hûn dixwazin stasyonên sotemeniyê yên vekirî li bajarê {city_translation[city]['ku']}ê bibînin hilbijêrin.",
                    "text_ar": f"اختار المحطة البنزين الفعلة الذي تريد أن تبحث عنها في أي منطقة في مدينة {city_translation[city]['ar']}.",
                    "options": option_2,
                }
            }
        )

    data = {
        "type": "question",
        "autocompleteHint_tr": "Şehir",
        "autocompleteHint_en": "City",
        "autocompleteHint_ar": "مدينة",
        "autocompleteHint_ku": "Bajar",
        "text_tr": "Açık akaryakıt istasyonlarını görmek istediğiniz şehri seçiniz.",
        "text_en": "Select the city you want to see the open gas stations.",
        "text_ar": "اختر المدينة التي تريد رؤية محطات الوقود المفتوحة.",
        "text_ku": "Bajarê ku xwe ya akaryakıt istasyonên vekirî bibînin hilbijêre.",
        "options": options_1,
    }

    with open(out_path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)



if __name__ == "__main__":
    main()