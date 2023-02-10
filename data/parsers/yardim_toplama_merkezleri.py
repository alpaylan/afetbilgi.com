import os 
import sys
import json
import pandas as pd
from utils.functions import turkish_title


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Yard%C4%B1m%20Toplama%20Merkezleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    curr_path = os.path.dirname(os.path.realpath(__file__))
    city_translation = json.loads(open(f"{curr_path}/utils/il_translate.json").read())

    df = pd.read_csv(url)
    df = df.fillna("")

    # sheet_id = "1L5zEuutakT94TBbi6VgsgUWdfIXTzyHZr3LwGVFATPE"
    # sheet_name = "Yard%C4%B1m%20Toplama%20Merkezleri"
    # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    # df2 = pd.read_csv(url)
    # df2 = df2.fillna("")

    # drop_columns = ["Submission Date", "Ad", "Soyad", "Telefon Numarası"]

    # df2 = df2.drop(columns=drop_columns)

    # rename = {
    #     "Lütfen Şehir Seçin": "Şehir",
    #     "Lütfen İlçenizi Giriniz": "İlçe",
    #     "Lütfen Yardım Toplama Merkezinin Bağlı Olduğu Kurumun İsmini Yazınız": "Kurumtmp",
    #     "Toplanma Merkezine Ait Bilginin Kaynağını Yazınız": "Link",
    #     "Toplanma Merkezine Ait Telefon Numarasını Ekleyiniz": "Telefon Numarası",
    # }

    # df2 = df2.rename(columns=rename)

    # df2['Kurum'] = df2['Kurumtmp'].astype(str) + " - " + df2['İlçe'].astype(str)
    # df2 = df2.drop(columns=["Kurumtmp", "İlçe"])

    # df = pd.concat([df, df2])

    df["Şehir"] = df["Şehir"].apply(str)
    df["Şehir"] = df["Şehir"].apply(str.strip)
    df["Şehir"] = df["Şehir"].apply(turkish_title)

    df["Açıklamalar"] = ""

    df = df.sort_values(by='Şehir')

    json_obj = {
        "autocompleteHint_tr": "Şehir",
        "autocompleteHint_en": "City",
        "autocompleteHint_ar": "مدينة",
        "autocompleteHint_ku": "Bajar",
    }
    json_obj['type'] = 'question'
    json_obj['text_tr'] = "Hangi şehirde eşya toplanacak yer arıyorsunuz?"
    json_obj['text_en'] = "In which city are you looking for item-donation?"
    json_obj['text_ku'] = "Hûn li Kîjan Bajarî Ji Bo Tiştan Bibexşînin Cîh Digerin?"
    json_obj['text_ar'] = "في أي مدينة تودّ أن تتبرع بغرض ما؟"
    json_obj['options'] = []

    cityData = {}

    for _, row in df.iterrows():
        city_name = turkish_title(row["Şehir"].strip())
        if city_name not in cityData:
            cityData[city_name] = []
        
        cityData[city_name].append({
            "city": city_name,
            "name": row["Kurum"].strip(),
            "url": row["Link"].strip(),
            "phone_number": row["Telefon Numarası"].strip(),
            "notes": row["Açıklamalar"].strip()
        })

    for city in cityData:
        json_obj['options'].append({
            "value": {
                "type": "data",
                "data": {
                    "dataType": "help-item-list",
                    "city": city,
                    "items": cityData[city]
                }
            },
            "name_tr": city,
            "name_en": city_translation[city]['en'],
            "name_ku": city_translation[city]['ku'],
            "name_ar": city_translation[city]['ar']
        })


    with open(out_path, "w") as f:
        f.write(json.dumps(json_obj, indent=4, ensure_ascii=False))
