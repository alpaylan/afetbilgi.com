import sys
import json
import pandas as pd

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "%C3%96nemli%20Web%20Siteleri"

    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    usefulLinks = []


    for _, row in df.iterrows():

        usefulLinks.append(
            {
                "name": row["İsim"].strip(),
                "url": row["Link"].strip(),
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "useful-links",
            "usefulLinks": usefulLinks
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()