import pandas as pd
import json
import sys

from utils.functions import turkish_title

def main():

    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open("./utils/il_translate.json").read())
    options = []
    
    
    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Tahliye%20Noktas%C4%B1%20Adresleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")


    tahliye_noktalari = []
    city_name = None

    for _, row in df.iterrows():
        tmp_sehir = turkish_title(row['Şehir'].strip())

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]["en"],
                        "name_ku": city_translation[city_name]["ku"],
                        "name_ar": city_translation[city_name]["ar"],
                        "value": {
                            "type": "data",
                            "data": {
                                "city": city_name,
                                "dataType": "evacuation-points",
                                "items": tahliye_noktalari,
                            },
                        },
                    }
                )
                city_name = row[0]
                tahliye_noktalari = []
        
        tahliye_noktalari.append(
            {
                "city": turkish_title(row['Şehir'].strip()),
                "county": turkish_title(row['İlçe'].strip()),
                "name": row['İsim'],
                "map_link": row['Maps Linki'],
                "address": row['Adres'],
                "contacts": [x.strip() for x in row['Telefon'].split("\n")],
                "validator": row['Teyit Merci'],
            }
        )
    
    else:
        options.append(
            {
                "name": city_name,
                "value": {
                    "type": "data",
                    "data": {
                        "city": city_name,
                        "dataType": "evacuation-points",
                        "items": tahliye_noktalari,
                    },
                },
            }
        )

    data = {
        "type": "question",
        "text_tr": "Tahliye noktalarını görmek istediğiniz şehri seçiniz.",
        "text_en": "Select the city where you want to see the evacuation points.",
        "text_ku": "Bajarê ku hûn dixwazin nuqteyên valakirinê bibînin hilbijêrin.",
        "text_ar": "حدد المدينة التي تريد أن ترى فيها نقاط الإخلاء.",
        "autocompleteHint": "Şehir",
        "options": options,
        "data": {
            "dataType": "evacuation-points",
            "items": tahliye_noktalari
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()