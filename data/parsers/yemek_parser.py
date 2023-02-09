import json

import pandas as pd
from utils.functions import turkish_title


def main():
    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Yemek"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/yemek.json"
    df = pd.read_csv(url, encoding="utf-8")

    # sheet_id = "1L5zEuutakT94TBbi6VgsgUWdfIXTzyHZr3LwGVFATPE"
    # sheet_name = "Yemek%20Da%C4%9F%C4%B1t%C4%B1m%20Alanlar%C4%B1"
    # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    # dfj = pd.read_csv(url, encoding=("utf-8"))

    # dfj = dfj.drop(columns=["Ad", "Soyad", "Telefon Numarası", "Submission ID"])

    # rename = {
    #     "Submission Date": "date",
    #     "Lütfen Şehir Seçiniz": "İl",
    #     "Lütfen İlçenizi Yazınız": "İlçe",
    #     "Konum Bilgisini Yazınız": "Lokasyon",
    #     "Konuma Ait Google Maps Linki Ekleyiniz": "Google Maps Linki",
    #     "Yemek Dağıtımına Yönelik Bilgi Linki veya Anons Bilgisi Ekleyiniz": "Anons Linki",
    #     "Yemek Dağıtım Merkezine Ait Telefon Numarasını Ekleyiniz ": "Telefon",
    # }

    # dfj = dfj.rename(columns=rename)

    # dfj[["Teyit Tarih", "Teyit Saati"]] = dfj["date"].str.split(" ", expand=True)

    # dfj = dfj.drop(columns=["date"])

    # df = pd.concat([df, dfj])

    df["İl"] = df["İl"].apply(str.strip)
    df["İl"] = df["İl"].apply(turkish_title)
    df["İlçe"] = df["İlçe"].apply(str.strip)
    df["İlçe"] = df["İlçe"].apply(turkish_title)

    df.sort_values(["İl", "İlçe"])

    unique_cities = df["İl"].unique()
    options_1 = []
    for city in unique_cities:
        city_df = df[df["İl"] == city]
        unique_ilce = city_df["İlçe"].unique()
        ilce_dict = {}
        for ilce in unique_ilce:
            ilce_dict[ilce] = []

        for _, row in city_df.iterrows():
            ilce_dict[row[1]].append(
                {
                    "name": row[2] if not pd.isna(row[2]) else None,
                    "maps_url": row[3] if not pd.isna(row[3]) else None,
                    "url": row[4] if not pd.isna(row[4]) else None,
                    "phone_number": row[5] if not pd.isna(row[5]) else None,
                    "updated_at_date": row[6] if not pd.isna(row[6]) else None,
                    "updated_at_time": row[7] if not pd.isna(row[7]) else None,
                }
            )
        option_2 = []
        for k, v in ilce_dict.items():
            option_2.append(
                {
                    "name": turkish_title(k.strip()),
                    "value": {
                        "type": "data",
                        "data": {
                            "dataType": "food-items",
                            "city": turkish_title(city.strip()),
                            "county": turkish_title(k.strip()),
                            "items": v,
                        },
                    },
                }
            )

        options_1.append(
            {
                "name": turkish_title(city.strip()),
                "value": {
                    "type": "question",
                    "text_tr": f"{city_translation[turkish_title(city.strip())]['tr']} şehrinde yemek olanakları ile ilgili bilgi almak istediğiniz ilçeyi seçiniz",
                    "text_en": f"Select the county you want to get information about food opportunities in {city_translation[turkish_title(city.strip())]['en']}",
                    "text_ar": f"حدد المنطقة التي تريد الحصول على معلومات حول امكانيات تناول الطعام فيها في {city_translation[turkish_title(city.strip())]['ar']}",
                    "text_ku": f"Bilindînên yemekên {city_translation[turkish_title(city.strip())]['ku']} li ser şehirê xwe hilbijêrin",
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
        "text_tr": "Yemek olanakları ile ilgili bilgi almak istediğiniz şehri seçiniz.",
        "text_en": "Choose the city you would like to see the food distribution centers.",
        "text_ku": "Ji kerema xwe bajarê ku hûn dixwazin agahdariyên li ser derfetên xwarinê bigirin hilbijêrin.",
        "text_ar": "يرجى تحديد المدينة التي تريد تلقي معلومات حول فرص تناول الطعام فيها.",
        "options": options_1,

        'externalData' : {
            "text_tr": 'Yemek olanakları hakkında daha fazla bilgi',
            "text_en": 'More information about food options',
            "text_ku": 'Agahdariyên li ser derfetên xwarinê',
            "text_ar": 'مزيد من المعلومات حول فرص تناول الطعام',
            "usefulLinks": [
                {
                    "name":'McDonald’s Türkiye',
                    "url": 'https://www.instagram.com/p/CocCDmzt_CI/?igshid=NTdlMDg3MTY=',
                },
                {
                    "name":'Adana\'da Destek Alabileceğiniz Yemek İşletmeleri',
                    "url": 'https://www.google.com/maps/d/u/0/viewer?mid=1jEw7Qe2Z7SXH8a4rMx9bso1hycYi3vc&ll=36.994885473974875%2C35.40509821285593&z=11',
                }
            ],
        }

    }

    with open(json_name, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
