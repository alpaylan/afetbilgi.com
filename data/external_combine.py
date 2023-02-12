import sys
import json
from datetime import datetime

if len(sys.argv) < 2:
    print("Usage: python external_combine.py <basedir>")
    sys.exit(1)
else:
    basedir = sys.argv[1]

cities = ['istanbul', 'ankara', 'izmir']

items = []

for city in cities:
    with open(basedir + '/afetyardimalanlari-org-' + city + '.json', 'r') as f:
        data = json.load(f)

        items.append({
            "type": "external-help-location",
            "name": data["name"],
            "latitude": data["location"]["latitude"],
            "longitude": data["location"]["longitude"],
            "lastUpdate": data["updates"][0]["update"],
            "status": data["active"]
        })

res =  {
    "update_time": datetime.now().isoformat(),
    "map_data": items
}

with open(basedir + '/latest.json', 'w') as f:
    json.dump(result, f, ensure_ascii=False, allow_nan=False)
