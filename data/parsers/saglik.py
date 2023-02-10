import sys
import json
import pandas as pd

from utils.functions import turkish_title

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)
    
    out_path = sys.argv[1]

    city_translation = json.loads(open("./utils/il_translate.json").read())

    # canlıya alındaktan sonra sheet_id ve sheet_name değişmeli 
    sheet_id = "10jxSHFfimCxmaGPiIYkVDSetXYXohXxZ0Pb6y_WVF5o"
    sheet_name = "Sa%C4%9Fl%C4%B1k%20hizmetleri"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    df["İl"] = df["İl"].apply(lambda x: turkish_title(x.strip()))
    df["İlçe"] = df["İlçe"].apply(lambda x: turkish_title(x.strip()))

    df = df.sort_values(by=["İl"])

    df = df.fillna("")

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
                "district": row["İlçe"],
                "name": row["Lokasyon"],
                "maps_url": row["Google Maps Linki"],
                "url": row["Anons Linki"],
                "phone_number": row["Telefon"],
                "updated_at_date": row["Teyit Tarih"],
                "updated_at_time": row["Teyit Saati"],
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
        "text_ku": "Di welatê ku hizmetên sağlîkê ya ku hûn jî arîyê ye?",
        "text_ar": "في أي مدينة تبحث عن رعاية صحية؟",
    }

    with open(out_path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()