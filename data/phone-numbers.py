
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
    # sheet_id = "1La7CSZYBkpO_jvIe6Xs252VQPp_tVx1ioOWYvzyRK_k"
    # sheet_name = "Telefon-Numaralari"
    # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "phone-numbers.json"

    # df = pd.read_csv(url, encoding="utf-8")
    df = pd.read_csv("phone-numbers.csv", encoding="utf-8")

    df = df.rename(columns={
        "Kurum": "name",
        "Telefon Numarası": "phone_number",
    })
    # print(df)
    

    json_obj = {
        "type": "data",
        "data": {
            "dataType": "phone-number-list",
            "phones": df.to_dict(orient='records')
        }
    }

    for phone_number in json_obj["data"]["phones"]:
        if len(phone_number["phone_number"]) <= 3:
            phone_number["is_plain"] = True

    
    with open(json_name, "w", encoding="utf-8") as f:
        json.dump(json_obj, f, ensure_ascii=False, indent=4)
