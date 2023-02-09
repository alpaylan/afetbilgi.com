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

    accounts = []

    

    with open(csv_file, "r", encoding="utf-8") as f:
        csv_reader = csv.reader(f, delimiter=',')

        skip_row_count = 2
        for row in csv_reader:

            if skip_row_count:
                skip_row_count -= 1
                continue
                
            accounts.append({
                "name": index_or_none(row, 0),
                "url": index_or_none(row, 1),
            })

    data = {
        "type": "data",
        "data": {
            "dataType": "twitter-account-list",
            "accounts": accounts
        }
    }

    print(json.dumps(data, ensure_ascii=False, indent=4))

if __name__ == "__main__":
    main()