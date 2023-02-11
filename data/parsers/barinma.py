import sys
import json
import pandas as pd
import os
from utils.functions import turkish_title


def index_or_none(l, i):
    if len(l) > i:
        return l[i]
    else:
        return None


def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    city_translation = json.loads(open(
        f"{os.path.realpath(os.path.dirname(__file__))}/utils/il_translate.json").read())

    sheet_id = "131Wi8A__gpRobBT3ikt5VD3rSZIPZxxtbqZTOUHUmB8"
    sheet_name = "Ge%C3%A7ici%20Bar%C4%B1nma%20Alanlar%C4%B1"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    df = pd.read_csv(url, encoding=("utf-8"))

    # sheet_id = "1L5zEuutakT94TBbi6VgsgUWdfIXTzyHZr3LwGVFATPE"
    # sheet_name = "Ge%C3%A7ici%20Bar%C4%B1nma%20Alanlar%C4%B1"
    # url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"

    # dfj = pd.read_csv(url, encoding=("utf-8"))
    # if not dfj.empty:
    #     dfj = dfj.drop(
    #         columns=[
    #             "Ad",
    #             "Soyad",
    #             "Telefon Numarası",
    #         ]
    #     )

    #     rename = {
    #         "Submission Date": "date",
    #         "Lütfen Şehir Seçiniz": "Şehir",
    #         "Lütfen İlçenizi Giriniz": "İlçe",
    #         "Konum Bilgisini Yazınız": "Lokasyon",
    #         "Varsa Konuma Ait Bilgilendirme Linki Ekleyiniz": "Link",
    #         "Konuma Ait Google Maps Linki Ekleyiniz": "Konum linki",
    #         "Daha Fazla Bilgi İçin İletişime Geçilebilecek Telefon Numarasını Giriniz": "Telefon",
    #         "Konuma Yönelik Ekstra Bilginiz Varsa Yazınız": "Açıklamalar",
    #     }

    #     dfj = dfj.rename(columns=rename)

    #     dfj["Lokasyon"] = dfj["İlçe"] + " - " + dfj["Lokasyon"]

    #     dfj[["Doğrulanma Tarihi", "Doğrulama Saati"]] = dfj["date"].str.split(
    #         " ", expand=True
    #     )

    #     dfj = dfj.drop(columns=["date", "İlçe", "Submission ID", "Telefon"])
    #     dfj["Doğrulanma Durumu"] = True

    #     df = pd.concat([df, dfj])

    df["Şehir"] = df["Şehir"].apply(str.strip)
    df["Şehir"] = df["Şehir"].apply(turkish_title)

    df = df.sort_values(["Şehir", "Lokasyon"])

    parsed = []
    options = []

    city_name = None
    for _, row in df.iterrows():
        tmp_sehir = turkish_title(row["Şehir"].strip())

        if tmp_sehir != city_name:
            if city_name is None:
                city_name = tmp_sehir
            else:
                options.append(
                    {
                        "name_tr": city_name,
                        "name_en": city_translation[city_name]["en"],
                        "name_ku": city_translation[city_name]["ku"],
                        "name_ar": city_translation[city_name]["ar"],
                        "value": {
                            "type": "data",
                            "data": {
                                "city": city_name,
                                "dataType": "city-accommodation",
                                "items": parsed,
                            },
                        },
                    }
                )
                city_name = row[0]

                parsed = []

        def get_data(x): return x.strip() if not pd.isna(x) else None

        parsed.append(
            {
                "city": city_name,
                "name": get_data(row["Lokasyon"]),
               
                # TODO: Add back after data migration, this is a temporary fix
                # "is_validated": get_data(row["Doğrulanma Durumu"]) == "Doğrulandı",
                
                "url": get_data(row["Link"]),
                "address": get_data(row["Konum linki"]),
                "validation_date": get_data(row["Doğrulanma Tarihi"]),
            }
        )

    else:
        options.append(
            {
                "name_tr": city_name,
                "name_en": city_translation[city_name]["en"],
                "name_ku": city_translation[city_name]["ku"],
                "name_ar": city_translation[city_name]["ar"],
                "value": {
                    "type": "data",
                    "data": {
                        "city": city_name,
                        "dataType": "city-accommodation",
                        "items": parsed,
                    },
                },
            }
        )

    data = {
        "type": "question",
        "text_tr": "Hangi şehirde kalacak yer arıyorsunuz?",
        "text_en": "In which city are you looking for temporary accommodation?",
        "text_ku": "Hûn li Kîjan Bajarî Cihên Lêhihewinê yên Demkî Digerin?",
        "text_ar": "في أي مدينة تبحث عن مساكن مؤقة",
        "autocompleteHint": "Şehir",
        "options": options,
        "externalData": {
            "text_tr": "Kalacak yer imkanı sağlayan diğer kaynaklar",
            "text_en": "Other sources that provide temporary accommodation",
            "text_ku": "Çavkaniyên din dijital li ser cihên lêhihewinê",
            "text_ar": "مصادر أخرى توفر مساكن مؤقة",
            "usefulLinks": [
                {
                    "name": "Otelz.com",
                    "url": "https://www.otelz.com/gecmisolsunturkiyem",
                },
                {
                    "name": "Turkish Airlines Holidays",
                    "url": "https://www.turkishairlinesholidays.com/tr-tr/depremzedeler-icin-oteller",
                },
                {
                    "name": "Ahbap Güvenli Bölgeler Haritası",
                    "url": "https://www.google.com/maps/d/u/1/viewer?mid=1aQ0TJi4q_46XAZiSLggkbTjPzLGkTzQ&ll=37.06301742072887%2C37.28739713964324&z=8",
                },
                {
                    "name": "HepsiEmlak Dostluk Çatısı",
                    "url": "https://www.hepsiemlak.com/emlak-yasam/genel/dostluk-catisi?utm_source=sm&utm_medium=post-ads&utm_campaign=socialmedia&fbclid=PAAabu7QLa2gN0L2L7t_UIz14kmlX8tb033u1yB9T_ypjLbrFuV4qMX9NWo-s",
                },
                {
                    "name": "T.C. MİLLÎ EĞİTİM BAKANLIĞI DESTEK HİZMETLERİ GENEL MÜDÜRLÜĞÜ E-DESTEK",
                    "url": "https://dhgm.meb.gov.tr/edestek/ogretmenevi/ogretmenevi_liste.aspx",
                },
                {
                    "name": "Depremzedelerin Kullanımına Açılan Tesis ve Salonlar",
                    "url": "https://gsb.gov.tr/haber-detay.html/968"
                },
                {
                    "name": "Evim Evindir",
                    "url": "https://www.evimevindir.com/"
                },
                {
                    "name": "Nilüfer Belediyesi Evim Evin Olsun",
                    "url": "https://www.nilufer.bel.tr/haber/evim-evin-olsun"
                },
                {
                    "name": "Missafir",
                    "url": "https://www.missafir.com/ev-sahipleriyle-depremzedeleri-bulusturma-platformu/"
                }
                {
                    "name": "Emlakjet Evin Umut Olsun",
                    "url": "https://www.emlakjet.com/evin-umut-olsun/"
                },
            ],
        },
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    main()
