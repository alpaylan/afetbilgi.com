import sys
import json
import pandas as pd


def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "Faydal%C4%B1%20Yaz%C4%B1lar"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    articles = []

    for _, row in df.iterrows():

        articles.append(
            {
                "title": "Lorem Ipsum",
                "author": "Lorem Ipsum",
                "url": "https://www.google.com",
                "topic": "Lorem Ipsum",
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "beneficial-articles",
            "articles": articles
        }
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
