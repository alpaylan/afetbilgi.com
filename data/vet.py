
import pandas as pd
import json


def todict(obj, classkey=None):
    if isinstance(obj, dict):
        data = {}
        for (k, v) in obj.items():
            data[k] = todict(v, classkey)
        return data
    elif hasattr(obj, "_ast"):
        return todict(obj._ast())
    elif hasattr(obj, "__iter__") and not isinstance(obj, str):
        return [todict(v, classkey) for v in obj]
    elif hasattr(obj, "__dict__"):
        data = dict([(key, todict(value, classkey)) 
            for key, value in obj.__dict__.items() 
            if not callable(value) and not key.startswith('_')])
        if classkey is not None and hasattr(obj, "__class__"):
            data[classkey] = obj.__class__.__name__
        return data
    else:
        return obj




if __name__ == "__main__":
    sheet_id = "1La7CSZYBkpO_jvIe6Xs252VQPp_tVx1ioOWYvzyRK_k"
    sheet_name = "Veterinerler"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "veteriner.json"
    df = pd.read_csv(url, encoding="utf-8")

    print(df)
    df = df.rename(columns={
        "Şehir": "city",
        "İsim": "name",
        "Telefon": "phone_number",
        "Konum": "address",
        "Konum Linki": "maps_link",
    })

    cities = df['city'].unique()

    json_obj = {
        "type": "question",
        "text": "Hangi şehirde veteriner arıyorsunuz?",
        "options": [
            {"name": city, "value": None} for city in cities
        ]
    }


    for city in cities:
        city_df = df[df['city'] == city]
        city_df = city_df.drop(columns=['city'])
        city_dict = city_df.to_dict(orient='records')
        city_dict = todict(city_dict)

        for option in json_obj['options']:
            if option['name'] == city:
                option['value'] = {
                    "type": "data",
                    "data": {
                        "dataType": "data-vet",
                        "city": city,
                        "vets": city_dict
                    }
                }

    with open(json_name, "w", encoding="utf-8") as f:
        json.dump(json_obj, f, ensure_ascii=False, indent=4)
