import sys
import json
import os
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
    sheet_name = "Hatay%20toplanma%20alan%C4%B1"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")
    df = df.fillna("")

    df["İl"] = df["İl"].apply(str.strip)
    df["İl"] = df["İl"].apply(turkish_title)
    df["İlçe"] = df["İlçe"].apply(str.strip)
    df["İlçe"] = df["İlçe"].apply(turkish_title)
    df["Mahalle"] = df["Mahalle"].apply(str.strip)
    df["Mahalle"] = df["Mahalle"].apply(turkish_title)
    df["Adres"] = df["Adres"].apply(str.strip)
    df["Adres"] = df["Adres"].apply(turkish_title)

    
    df = df.sort_values(by=["İl", "İlçe", "Mahalle", "Toplanma Alanı"])
    unique_cities = df["İl"].unique()
    options_1 = []

    for city in unique_cities:
        city_df = df[df["İl"] == city]
        unique_counties = city_df["İlçe"].unique()
        options_2 = []
        for county in unique_counties:
            county_df = city_df[city_df["İlçe"] == county]

            unique_neighborhoods = county_df["Mahalle"].unique()

            neighborhood_dict = {}

            options_3 = []
            for neighborhood in unique_neighborhoods:
                neighborhood_dict[neighborhood] = []

            for _, row in county_df.iterrows():
                neighborhood_dict[row["Mahalle"]].append(
                    {
                        "name": row['Toplanma Alanı'],
                        "address": row['Adres'],
                        "maps_link": row['Google Maps Linki'],
                    })

            for k, v in neighborhood_dict.items():
                options_3.append({
                    "name": k,
                    "value": {
                        "type": "data",
                        "data": {
                            "dataType": "emergency-gathering",
                            "city": city,
                            "county": county,
                            "neighborhood": k,
                            "items": v
                        }
                        
                    }
                })
        
            options_2.append({
                "name": county,
                "value": {
                    "type": "question",
                    "autocompleteHint_tr": "Mahalle",
                    "autocompleteHint_en": "Neighborhood",
                    "autocompleteHint_ar": "حي",
                    "autocompleteHint_ku": "Hev",
                    "text_tr": f"{county} ilçesinde hangi mahallede acil toplanma alanı arıyorsunuz?",
                    "text_en": f"Which neighborhood in {county} are you looking for an emergency meeting area?",
                    "text_ar": f"أي حي في {county} تبحث عن منطقة اجتماعات طارئة؟",
                    "text_ku": f"Çi hevî li {county} hûn ji bo biryarên xebatê ya xweşî re hatine?",
                    "options": options_3
                }
            })

        # options_1.append({
        #     "name": city,
        #     "value": {
        #         "type": "question",
        #         "text_tr": f"{city} ilinde hangi ilçede acil toplanma alanı arıyorsunuz?",
        #         "text_en": f"Which county in {city} are you looking for an emergency meeting area?",
        #         "text_ar": f"في أي محافظة في {city} تبحث عن منطقة اجتماعات طارئة؟",
        #         "text_ku": f"Li {city} çi ilçeyê hûn ji bo biryarên xebatê ya xweşî re hatine?",
        #         "options": options_2
        #     }
        # })

    data = {
        "type": "question",
        "text_tr": "Hangi ilçede acil toplanma alanı arıyorsunuz?",
        "text_en": "Which county are you looking for an emergency meeting area?",
        "text_ar": "في أي محافظة تبحث عن منطقة اجتماعات طارئة؟",
        "text_ku": "Li çi ilçeyê hûn ji bo biryarên xebatê ya xweşî re hatine?",
        "options": options_2
    }

    # data = {
    #     "type": "question",
    #     "text_tr": "Hangi ilde acil toplanma alanı arıyorsunuz?",
    #     "text_en": "Which city are you looking for an emergency meeting area?",
    #     "text_ar": "في أي مدينة تبحث عن منطقة اجتماعات طارئة؟",
    #     "text_ku": "Li çi şehre hûn ji bo biryarên xebatê ya xweşî re hatine?",
    #     "autocompleteHint_tr": "Şehir",
    #     "autocompleteHint_en": "City",
    #     "autocompleteHint_ar": "مدينة",
    #     "autocompleteHint_ku": "Bajar",
    #     "options": options_1
    # }

    with open(out_path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()