import pandas as pd
import json
import os 
from utils.functions import turkish_title


if __name__ == '__main__':

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Yard%C4%B1m%20Toplama%20Merkezleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    curr_path = os.path.dirname(os.path.realpath(__file__))
    city_translation = json.loads(open(f"{curr_path}/utils/il_translate.json").read())

    df = pd.read_csv(url)
    df = df.fillna("")

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
        city_name = turkish_title(row[0].strip())
        if city_name not in cityData:
            cityData[city_name] = []
        
        cityData[city_name].append({
            "city": city_name,
            "name": row[1],
            "url": row[2],
            "phone_number": row[3],
            "notes": row[4]
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


    with open(f"{os.path.dirname(os.path.realpath(__file__))}/../datasets/yardim_toplama_merkezleri.json", "w") as f:
        f.write(json.dumps(json_obj, indent=4, ensure_ascii=False))
