
import pandas as pd
import numpy as np
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
    csv_name ="yemek.csv"
    json_name = "yemek.json"
    df = pd.read_csv(csv_name, encoding="utf-8")
    df = df.replace(np.nan, None)
    df = df.rename(columns={
        "İl": "city",
        "İlçe": "county",
        "Lokasyon": "name",
        "Google Maps Linki": "maps_url",
        "Anons Linki": "url",
        "Telefon": "phone_number",
        "Teyit Tarih": "updated_at_date",
        "Teyit Saati": "updated_at_time",
    })

    cities = df['city'].unique()

    json_obj = {
        "type": "question",
        "text": "Yemek olanakları ile ilgili bilgi almak istediğiniz şehri seçiniz",
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
                    "type": "question",
                    "text": f"{city} şehrinde yemek olanakları ile ilgili bilgi almak istediğiniz ilçeyi seçiniz",
                    "options": [
                        {"name": county, "value": None} for county in city_df['county'].unique()
                    ]
                }
                for county in city_df['county'].unique():
                    county_df = city_df[city_df['county'] == county]
                    county_df = county_df.drop(columns=['county'])
                    county_dict = county_df.to_dict(orient='records')
                    county_dict = todict(county_dict)
                    for c_option in option['value']['options']:
                        if c_option['name'] == county:
                            c_option['value'] = {
                                "type": "data",
                                "data": {
                                    "dataType": "food-items",
                                    "city": city,
                                    "county": county,
                                    "items": county_dict
                                }
                            }

    with open(json_name, "w", encoding="utf-8") as f:
        json.dump(json_obj, f, ensure_ascii=False, indent=4)
