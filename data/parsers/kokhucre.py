import os 
import sys
import json
import pandas as pd

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    sheet_id = "136czRg-KSQ4zW_1rP1vwJpMFi57GeDeN_0Wh-bFNCjw"
    sheet_name = "K%C3%B6k%20H%C3%BCcre%20Ba%C4%9F%C4%B1%C5%9F%20Noktalar%C4%B1"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"
    df = pd.read_csv(url)
    df.rename(columns={'BÖLGE İSMİ':'area', 'ŞEHİR':'city', 'ADRES':'address', 'TELEFON NUMARASI':'phone'}, inplace=True)
    json_obj = {}
    json_obj['type'] = 'data'
    json_obj['data'] = {}
    json_obj['data']['dataType'] = 'stem-cell-donation'
    json_obj['data']['items'] = [
        {
            'area': row['area'].strip(),
            'city': row['city'].strip(),
            'address': row['address'].strip(),
            'phone': row['phone'].strip()
        } for _, row in df.iterrows()
    ]
    with open(out_path, "w") as f:
        f.write(json.dumps(json_obj, indent=4, ensure_ascii=False))
