import pandas as pd
import json
from utils.functions import turkish_title



if __name__ == "__main__":
    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Veterinerler"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../latest_datasets/veteriner.json"
    df = pd.read_csv(url, encoding="utf-8")

    df.sort_values(by='Şehir')

    options = []
    vets = []

    city_name = None

    for _, row in df.iterrows():
        
        tmp_sehir = turkish_title(row[0].strip())

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "value" : {
                            "type": "data",
                            "data": {
                                "dataType": "data-vet",
                                "city": city_name,
                                "vets": vets
                            }
                        },
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]['en'],
                        "name_ar": city_translation[city_name]['ar'],
                        "name_ku": city_translation[city_name]['ku'],
                    }
                )
                vets = []
                city_name = tmp_sehir

        vets.append(
            {
                "name": row[1] if not pd.isna(row[1])  else None,
                "phone_number": row[2] if not pd.isna(row[2]) else None,
                "address": row[3] if not pd.isna(row[3]) else None,
                "maps_link": row[4] if not pd.isna(row[4]) else None,
            }
        )
        
    else:
        options.append(
            {
                "value" : {
                    "type": "data",
                    "data": {
                        "dataType": "data-vet",
                        "city": city_name,
                        "vets": vets
                    }
                },
                "name_tr": city_name,
                "name_en": city_translation[city_name]['en'],
                "name_ar": city_translation[city_name]['ar'],
                "name_ku": city_translation[city_name]['ku'],
            }
        )

    data = {
        "type": "question",
        "options": options,
        "text_tr": "Hangi şehirde veteriner arıyorsunuz?",
        "text_en": "In which city are you looking for a veterinary clinic?",
        "text_ku": "Hûn li kîjan bajarî li veterîner digerin?",
        "text_ar": "في أي مدينة تبحث عن طبيب بيطري؟",
    }

    with open(json_name, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
