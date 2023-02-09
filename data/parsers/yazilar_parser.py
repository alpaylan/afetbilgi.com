import pandas as pd
import json
import os

def main():
    sheet_id = "1La7CSZYBkpO_jvIe6Xs252VQPp_tVx1ioOWYvzyRK_k"
    sheet_name = "Konu%20Hakk%C4%B1nda%20Yaz%C4%B1lar"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    json_name = "../datasets/yazilar.json"
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