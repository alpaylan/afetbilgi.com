import sys
import json

if len(sys.argv) < 2:
    print("Usage: python external_combine.py <basedir>")
    sys.exit(1)
else:
    basedir = sys.argv[1]

cities = ['istanbul', 'ankara', 'izmir']

result = {}

for city in cities:
    with open(basedir + '/afetyardimalanlari-org-' + city + '.json', 'r') as f:
        result[city] = json.load(f)

with open(basedir + '/afetyardimalanlari-org.json', 'w') as f:
    json.dump(result, f, ensure_ascii=False, allow_nan=False)
