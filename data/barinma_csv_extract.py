import sys
import csv
import json

def index_or_none(l, i):
    if len(l) > i:
        return l[i]
    else:
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python csv_extract.py <csv_file>")
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
                    options.append({
                        "name": city_name,
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
        "text": "Hangi şehirde kalacak yer arıyorsunuz?",
        "autocompleteHint": "Şehir",
        "options": options
    }

    print(json.dumps(data, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()