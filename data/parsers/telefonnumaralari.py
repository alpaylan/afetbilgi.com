import sys
import json
import pandas as pd


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
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "%C3%96nemli%20Telefon%20Numaralar%C4%B1%28Yeni%29"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")
    # df = pd.read_csv("phone-numbers.csv", encoding="utf-8")

    df = df.fillna("")

    df = df.rename(columns={
        "Kategori": "category",
        "Kurum": "name",
        "Telefon Numarası": "phone_number",
        "Detaylar": "details",
    })
    # print(df)
    
    phones = []
    for _, row in df.iterrows():
        phones.append(
            {
                "category": row["category"],
                "name": row["name"],
                "phone_number": row["phone_number"],
                "phones": row["phone_number"].split("\n"),
                "details": row["details"],
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "phone-number-list",
            "phones": phones
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

