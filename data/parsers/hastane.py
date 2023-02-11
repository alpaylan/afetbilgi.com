import sys
import json
import pandas as pd
import os
from utils.functions import turkish_title


def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open(
        f"{os.path.realpath(os.path.dirname(__file__))}/utils/il_translate.json").read())

    # canlıya alındaktan sonra sheet_id ve sheet_name değişmeli
    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Sahra%20Hastaneleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    df["İl"] = df["İl"].apply(lambda x: turkish_title(x.strip()))
    df["İlçe"] = df["İlçe"].apply(lambda x: turkish_title(x.strip()))

    df = df.sort_values(by=["İl"]).fillna("")

    city_name = None
    options = []
    items = []
    for _, row in df.iterrows():
        tmp_sehir = row['İl'].strip()

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]['en'],
                        "name_ar": city_translation[city_name]['ar'],
                        "name_ku": city_translation[city_name]['ku'],
                        "value": {
                            "type": "data",
                            "data": {
                                "dataType": "healthcare-services",
                                "city": city_name,
                                "items": items,
                            }
                        }

                    }
                )
                city_name = tmp_sehir
                items = []

        items.append(
            {
                "district": row["İlçe"].strip(),
                "name": row["Lokasyon"].strip(),
                "maps_url": row["Google Maps Linki"].strip(),
                "url": row["Anons Linki"].strip(),
                "phone_number": row["Telefon"].strip(),
                "updated_at_date": row["Teyit Tarih"].strip(),
                "updated_at_time": row["Teyit Saati"].strip(),
            }
        )
    else:
        options.append(
            {
                "name_tr": city_name,
                "name_en": city_translation[city_name]['en'],
                "name_ar": city_translation[city_name]['ar'],
                "name_ku": city_translation[city_name]['ku'],
                "value": {
                    "type": "data",
                    "data": {
                        "dataType": "healthcare-services",
                        "city": city_name,
                        "items": items,
                    }
                }

            }
        )

    data = {
        "type": "question",
        "options": options,
        "text_tr": "Hangi şehirde sağlık hizmeti arıyorsunuz?",
        "text_en": "Which city are you looking for healthcare services?",
        "text_ku": "Hûn li kîjan bajarî li xizmetên tendirûstiyê digerin? ",
        "text_ar": "في أي مدينة تبحث عن رعاية صحية؟",
    }

    with open(out_path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
