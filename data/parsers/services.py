import sys
import json
import pandas as pd
from utils.functions import turkish_title
import os

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open(
        f"{os.path.realpath(os.path.dirname(__file__))}/utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Afet%20B%C3%B6lgesi%20D%C4%B1%C5%9F%C4%B1ndaki%20%C5%9Eehirlerdeki%20Hizmetler"
    sheet_gid = "1597946944"

    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={sheet_gid}"

    df = pd.read_csv(url, encoding="utf-8")
    df = df.fillna("")

    df["İl"] = df["İl"].apply(str.strip)
    df["İl"] = df["İl"].apply(turkish_title)
    df["Servis Kategorisi"] = df["Servis Kategorisi"].apply(str.strip)
    df["Servis Kategorisi"] = df["Servis Kategorisi"].apply(turkish_title)

    df.sort_values(["İl", "Servis Kategorisi"])

    unique_cities = df["İl"].unique()
    options = []

    for city in unique_cities:
        city_df = df[df["İl"] == city]
        unique_category = city_df["Servis Kategorisi"].unique()
        category_dict = {}
        for category in unique_category:
            category_dict[category] = []

        for _, row in city_df.iterrows():
            category_dict[row["Servis Kategorisi"]].append(
                {
                    "city": row["İl"].strip(),
                    "county": row["İlçe"].strip(),
                    "location": row["Lokasyon"].strip(),
                    "locationLink": row["Google Maps Linki"].strip() if not pd.isna(row['Google Maps Linki']) else None,
                    "specificCategory": row["Spesifik Servis Tipi"].strip() if not pd.isna(row['Spesifik Servis Tipi']) else None,
                    "source": row["Anons Linki"].strip() if not pd.isna(row['Anons Linki']) else None,
                }
            )
        option_2 = []
        for k, v in category_dict.items():
            option_2.append(
                {
                    "name": turkish_title(k.strip()),
                    "value": {
                        "type": "data",
                        "data": {
                            "dataType": "services",
                            "city": turkish_title(city.strip()),
                            "category": turkish_title(k.strip()),
                            "items": v,
                        },
                    },
                }
            )
        
        options.append(
            {
                "name": turkish_title(city.strip()),
                "value": {
                    "type": "question",
                    "text_tr": f"{city_translation[turkish_title(city.strip())]['tr']} şehrinde bilgi almak istediğiniz kategoriyi seçiniz.",
                    "text_en": f"Select the category you want to get information about service opportunities in {city_translation[turkish_title(city.strip())]['en']}",
                    "text_ar": f"حدد الفئة التي تريد الحصول على معلومات عنها في {city_translation[turkish_title(city.strip())]['ar']}.",
                    "text_ku": f"Kategoriya ku hûn dixwazin li bajarê {city_translation[turkish_title(city.strip())]['ku']} agahdarî bistînin hilbijêrin.",
                    "options": option_2,
                },
            }
        )

    data = {
        "type": "question",
        "autocompleteHint_tr": "Şehir",
        "autocompleteHint_en": "City",
        "autocompleteHint_ar": "مدينة",
        "autocompleteHint_ku": "Bajar",
        "text_tr": "Servisler hakkında bilgi almak istediğiniz şehri seçiniz",
        "text_en": "Select the city you want to get information about services",
        "text_ku": "Bajarê ku hûn dixwazin li ser karûbaran agahdarî bistînin hilbijêrin",
        "text_ar": "حدد المدينة التي تريد تلقي معلومات حول الخدمات فيها",
        "options": options,
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()