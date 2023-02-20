import os
import sys
import json
import hashlib

import requests


if len(sys.argv) >= 2:
    new_data_path = sys.argv[1]
else:
    os.exit(1)

def walk(options1, options2):
    if options1 and len(options1) > 0 and options1[0]['value']['type'] == 'question':
        for i in range(len(options1)):
            walk(
                options1[i]['value']['options'] if options1 and i < len(options1) and 'options' in options1[i]['value']  else None,
                options2[i]['value']['options'] if options2 and i < len(options2) and  'options' in options2[i]['value'] else None
            )

    else:
        options1_set = set()
        options2_set = set()

        if options1:
            for group1 in options1:
                group1 = group1['value']

                options1_set.add(
                    hashlib.md5(json.dumps(group1).encode('utf-8')).hexdigest()
                )

        if options2:
            for group2 in options2:
                group2 = group2['value']

                options2_set.add(
                    hashlib.md5(json.dumps(group2).encode('utf-8')).hexdigest()
                )

        if options2:
            for group2 in options2:
                group2 = group2['value']

                h = hashlib.md5(json.dumps(group2).encode('utf-8')).hexdigest()

                if h not in options1_set:
                    group2['added_last_day'] = True
                else:
                    group2['added_last_day'] = False

base_data = requests.get('https://cdn.afetbilgi.com/2023-02-20_16-12-37.json')

with open(new_data_path, 'r') as f:
    new_data = json.load(f)

walk(base_data.json()['options'], new_data['options'])

print(json.dumps(new_data, ensure_ascii=False, allow_nan=False))
