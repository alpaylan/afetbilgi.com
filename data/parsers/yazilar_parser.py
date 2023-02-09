import pandas as pd
import json
import os

def main():
    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "Faydal%C4%B1%20Yaz%C4%B1lar"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../latest_datasets/yazilar.json"
    df = pd.read_csv(url, encoding="utf-8")

    articles = []


    for _, row in df.iterrows():

        articles.append(
            {
                "title": row['Yazı Adı'],
                "author": row['Yazar'],
                "url": row['Link'],
                "topic": row['Yazı Konusu'],
            }
        )

    data = {
        "type": "data",
        "data": {
            "dataType": "beneficial-articles",
            "articles": articles
        }
    }

    with open(json_name, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)



if __name__ == "__main__":
    main()