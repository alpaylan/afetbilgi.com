import pandas as pd
import json

from utils.functions import turkish_title

def main():
    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "K%C4%B1z%C4%B1lay%20Kan%20Ba%C4%9F%C4%B1%C5%9F%20Noktalar%C4%B1"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/blood.json"
    df = pd.read_csv(url, encoding="utf-8")

    skip = 1
    options = []
    added_cities = []
    for _, row in df.iterrows():
        if skip:
            skip = 0
            continue

        city = turkish_title(row[0].split()[0].strip())

        i = 1
        city_sube = []
        while True and i < len(row):
            if pd.isna(row[i]):
                break
            dd = row[i].split("\n")

            sube_dict = {}
            for d in dd:
                if ':' not in d:
                    continue
                row_data = d.split(":", 1)
                sube_dict[row_data[0].strip()] = row_data[1].strip()

            name = sube_dict.get('Şube Adı') or sube_dict.get('Temsilcilik Adı')
            head = sube_dict.get('Şube Başkanı') or sube_dict.get('Temsilcilik Koordinatörü')
            address = sube_dict.get('Şube Adresi') or sube_dict.get('Temsilcilik Adresi')
            phone_number = sube_dict.get('Telefon No')
            cell_phone_number = sube_dict.get('Cep Telefonu')
            fax = sube_dict.get('Fax')

            city_sube.append(
                {
                    "city": city,
                    "name": name,
                    "head": head,
                    "address": address,
                    "phone_number": phone_number,
                    "cell_phone_number": cell_phone_number,
                    "fax": fax,
                }
            )

            i += 1

        if city in added_cities:
            for option in options:
                if option['name_tr'] == city:
                    option['value']['data']['items'].extend(city_sube)
        else:
            options.append({
                "name_tr": city,
                "name_en": city_translation[city]['en'],
                "name_ar": city_translation[city]['ar'],
                "name_ku": city_translation[city]['ku'],
                "value": {
                    "type": "data",
                    "data": {
                        "dataType": "blood-donationlist",
                        "items": city_sube
                    }
                }
            })

            added_cities.append(city)

    data = {
        "type": "question",
        "autocomplementHint_tr": "Şehir",
        "autocomplementHint_en": "City",
        "autocomplementHint_ar": "مدينة",
        "autocomplementHint_ku": "Bajar",
        "options": options,
        "text_tr": "Hangi şehirde kan verebilirsiniz?",
        "text_en": "Places you can donate blood",
        "text_ku": " Hûn Dikarin Li Kîjan Bajarî Xwîn Bidin?",
        "text_ar": "في أي مدينة تريد التبرع بالدم؟"
    }     


    with open(json_name, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)



if __name__ == "__main__":
    main()