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
    if len(options1) > 0 and options1[0]['value']['type'] == 'question':
        for i in range(len(options1)):
            if 'options' in options1[i]['value'] and 'options' in options2[i]['value']:
                walk(options1[i]['value']['options'], options2[i]['value']['options'])

    else:
        options1_set = set()
        options2_set = set()


        for group1 in options1:
            group1 = group1['value']

            options1_set.add(
                hashlib.md5(json.dumps(group1).encode('utf-8')).hexdigest()
            )

        for group2 in options2:
            group2 = group2['value']

            options2_set.add(
                hashlib.md5(json.dumps(group2).encode('utf-8')).hexdigest()
            )

        for group2 in options2:
            group2 = group2['value']

            h = hashlib.md5(json.dumps(group2).encode('utf-8')).hexdigest()

            if h not in options1_set:
                group2['added_last_day'] = True
            else:
                group2['added_last_day'] = False

base_data = requests.get('https://cdn.afetbilgi.com/latest.json')

with open(new_data_path, 'r') as f:
    new_data = json.load(f)

walk(base_data.json()['options'], new_data['options'])

print(json.dumps(new_data, ensure_ascii=False, allow_nan=False, indent=4))
