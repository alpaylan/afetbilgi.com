import sys
import json
import pandas as pd
from utils.functions import turkish_title



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open("./utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Veterinerler"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding="utf-8")

    # sheet_id = "1L5zEuutakT94TBbi6VgsgUWdfIXTzyHZr3LwGVFATPE"
    # sheet_name = "Veterinerler"
    # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    # df2 = pd.read_csv(url, encoding="utf-8")

    # drop_columns = ["Submission Date", "Ad", "Soyad", "Telefon Numarası"]
    # df2 = df2.drop(columns=drop_columns)

    # rename = {
    #     "Lütfen Şehir Seçiniz": "Şehir",
    #     "Veteriner İsmini Yazınız": "İsimtmp",
    #     "Veterinere Ait Telefon Numarasını Giriniz": "Telefon",
    #     "Veterinerin Adresini Yazınız": "Konum",
    #     "Veterinere Ait Google Maps Linkini Ekleyiniz": "Konum Linki",
    #     "Lütfen İlçenizi Giriniz": "İlçe"
    # }

    # df2 = df2.rename(columns=rename)

    # df2["İsim"] = df2["İsimtmp"].astype(str) + " - " + df2["İlçe"].astype(str)

    # df2 = df2.drop(columns=["İsimtmp", "İlçe"])

    # df = pd.concat([df, df2])

    df["Şehir"] = df["Şehir"].apply(str.strip)
    df["Şehir"] = df["Şehir"].apply(turkish_title)

    df = df.sort_values(by='Şehir')

    options = []
    vets = []

    city_name = None

    for _, row in df.iterrows():
        
        tmp_sehir = turkish_title(row["Şehir"].strip())

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "value" : {
                            "type": "data",
                            "data": {
                                "dataType": "data-vet",
                                "city": city_name,
                                "vets": vets
                            }
                        },
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]['en'],
                        "name_ar": city_translation[city_name]['ar'],
                        "name_ku": city_translation[city_name]['ku'],
                    }
                )
                vets = []
                city_name = tmp_sehir

        vets.append(
            {
                "name": row["İsim"] if not pd.isna(row["İsim"])  else None,
                "phone_number": row["Telefon"] if not pd.isna(row["Telefon"]) else None,
                "address": row["Konum"] if not pd.isna(row["Konum"]) else None,
                "maps_link": row["Konum Linki"] if not pd.isna(row["Konum Linki"]) else None,
            }
        )
        
    else:
        options.append(
            {
                "value" : {
                    "type": "data",
                    "data": {
                        "dataType": "data-vet",
                        "city": city_name,
                        "vets": vets
                    }
                },
                "name_tr": city_name,
                "name_en": city_translation[city_name]['en'],
                "name_ar": city_translation[city_name]['ar'],
                "name_ku": city_translation[city_name]['ku'],
            }
        )

    data = {
        "type": "question",
        "options": options,
        "text_tr": "Hangi şehirde veteriner arıyorsunuz?",
        "text_en": "In which city are you looking for a veterinary clinic?",
        "text_ku": "Hûn li kîjan bajarî li veterîner digerin?",
        "text_ar": "في أي مدينة تبحث عن طبيب بيطري؟",
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
