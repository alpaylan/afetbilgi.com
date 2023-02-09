import pandas as pd
import json

def main():
    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "%C3%96nemli%20Web%20Siteleri"

    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/faydali_linkler.json"
    df = pd.read_csv(url, encoding="utf-8", header=None)

    usefulLinks = []

    for _, row in df.iterrows():

        usefulLinks.append(
            {
                "name": row[0],
                "url": row[1],
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "useful-links",
            "usefulLinks": usefulLinks
        }
    }

    with open(json_name, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()