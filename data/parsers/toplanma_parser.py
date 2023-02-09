import pandas as pd
import json

from utils.functions import turkish_title

def main():

    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "G%C3%BCvenli%20Toplanma%20Alanlar%C4%B1"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/toplanma.json"
    df = pd.read_csv(url, encoding="utf-8")
    df = df.sort_values(by=['Şehirler'])

    options = []
    items = []
    city_name = None
    for _, row in df.iterrows():
        tmp_sehir = turkish_title(row['Şehirler'].strip())

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]['en'],
                        "name_ar": city_translation[city_name]['ar'],
                        "name_ku": city_translation[city_name]['ku'],
                        "value": {
                            "type": "data",
                            "data": {
                                "dataType": "new-gathering-list",
                                "items": items
                            }
                        }
                    }
                )
                items = []
                city_name = tmp_sehir

        items.append(
            {
                "name": row['Konum'] if not pd.isna(row['Konum'])  else None,
                "url": row['Maps Linki'] if not pd.isna(row['Maps Linki']) else None,
                "source": row['Kaynak'] if not pd.isna(row['Kaynak']) else None,
            }
        )
    else:
        options.append(
            {
                "name_tr": city_name,
                "name_en": city_translation[city_name]['en'],
                "name_ar": city_translation[city_name]['ar'],
                "name_fr": city_translation[city_name]['ku'],
                "value": {
                    "type": "data",
                    "data": {
                        "dataType": "new-gathering-list",
                        "items": items
                    }
                }
            }
        )

    data = {
        "type": "question",
        "options": options,
        "text_tr": "Hangi şehirde toplanacak yer arıyorsunuz?",
        "text_en": "In which city are you looking for safe assembly area?",
        "text_ku": "Hûn Li Kîjan Bajarî Cihên Ewle Bo Kombûnê Digerin?",
        "text_ar": "في أي مدينة تبحث عن مناطق تجمع الأمنة"
    }

    with open(json_name, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
