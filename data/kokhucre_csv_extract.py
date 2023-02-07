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
        print("Usage: python kokhucre_csv_extract.py <csv_file>")
        return

    csv_file = sys.argv[1]

    data = []

    with open(csv_file, "r", encoding="utf-8") as f:
        csv_reader = csv.reader(f, delimiter=',')

        is_first_row = True

        for row in csv_reader:

            if is_first_row:
                is_first_row = False
                continue
            
            data.append({
                "area": index_or_none(row, 0),
                "city": index_or_none(row, 1),
                "address": index_or_none(row, 2),
                "phone": index_or_none(row, 3),
            })

    print(json.dumps({
        "type": "data",
        "data": {
            "dataType": "stem-cell-donation",
            "items": data
        }
    }, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()