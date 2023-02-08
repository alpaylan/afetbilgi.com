import sys
import csv
import json

cities = {
    'tr': ['Adana', 'Gaziantep', 'Malatya', 'Diyarbakır', 'Şanlıurfa', 'Kahramanmaraş', 'Osmaniye', 'Adıyaman', 'Kilis', 'Mardin', 'Hatay', 'Amasya', 'Ankara', 'Antalya', 'Balıkesir', 'Bayburt', 'Bitlis', 'Bursa', 'Denizli', 'Erzurum', 'Eskişehir', 'Kayseri', 'Kırklareli', 'Konya', 'Kütahya', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Rize', 'Sakarya', 'Sivas', 'Şırnak', 'Trabzon', 'Uşak', 'Van'],
    'en': ['Adana', 'Gaziantep', 'Malatya', 'Diyarbakır', 'Şanlıurfa', 'Kahramanmaraş', 'Osmaniye', 'Adıyaman', 'Kilis', 'Mardin', 'Hatay', 'Amasya', 'Ankara', 'Antalya', 'Balıkesir', 'Bayburt', 'Bitlis', 'Bursa', 'Denizli', 'Erzurum', 'Eskişehir', 'Kayseri', 'Kırklareli', 'Konya', 'Kütahya', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Rize', 'Sakarya', 'Sivas', 'Şırnak', 'Trabzon', 'Uşak', 'Van'],
    'ku': ['Adana- Edene', 'Gaziantep- Dîlok', 'Malatya- Meletî', 'Diyarbakır- Amed', 'Şanlıurfa- Riha', 'Kahramanmaraş- Gurgum', 'Osmaniye', 'Adıyaman- Semsûr', 'Kilis- Kilîs', 'Mardin- Mêrdîn', 'Hatay- Xetay', 'Amasya', 'Ankara- Enqere', 'Antalya', 'Balıkesir', 'Bayburt', 'Bitlis- Bedlîs', 'Bursa', 'Denizli', 'Erzurum- Erzêrom', 'Eskişehir', 'Kayseri- Qeyserî', 'Kırklareli', 'Konya- Qonye', 'Kütahya', 'Mersin- Mêrsîn', 'Muğla', 'Muş- Mûş', 'Nevşehir', 'Rize', 'Sakarya', 'Sivas- Sêwas', 'Şırnak-Şirnex', 'Trabzon', 'Uşak', 'Van- Wan']
}

def index_or_none(l, i):
    if len(l) > i:
        return l[i]
    else:
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python barinma_csv_extract.py <csv_file>")
        return

    csv_file = sys.argv[1]

    parsed = []

    options = []

    with open(csv_file, "r", encoding="utf-8") as f:
        csv_reader = csv.reader(f, delimiter=',')

        is_first_row = True
        city_name = None
        for row in csv_reader:

            if is_first_row:
                is_first_row = False
                continue

            if row[0] != city_name:
                if city_name is None:
                    city_name = row[0]
                else:
                    city_name_2 = 'Kahramanmaraş' if city_name == 'K. Maraş' else city_name

                    options.append({
                        "name_tr": city_name_2,
                        "name_en": cities['en'][cities['tr'].index(city_name_2)],
                        "name_ku": cities['ku'][cities['tr'].index(city_name_2)],
                        "value": {
                            "type": "data",
                            "data": {
                                "city": city_name,
                                "dataType": "city-accommodation",
                                "items": parsed
                            }
                        }
                    })
                    city_name = row[0]

                    parsed = []


            parsed.append({
                "city": index_or_none(row, 0),
                "name": index_or_none(row, 1),
                "is_validated": index_or_none(row, 2) == "Doğrulandı",
                "url": index_or_none(row, 3),
                "address": index_or_none(row, 4),
                "validation_date": index_or_none(row, 5),
            })

    data = {
        "type": "question",
        "text_tr": "Hangi şehirde kalacak yer arıyorsunuz?",
        "text_en": "In which city are you looking for temporary accommodation?",
        "text_ku": "Hûn li Kîjan Bajarî Cihên Lêhihewinê yên Demkî Digerin?",
        "text_ar": "في أي مدينة تبحث عن مساكن مؤقة",
        "autocompleteHint": "Şehir",
        "options": options
    }

    print(json.dumps(data, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()
