import sys
import json
from datetime import datetime, timedelta

def convertUTCtoTurkeyTime(dateString):
    date = datetime.strptime(dateString.split('.')[0], '%Y-%m-%dT%H:%M:%S')
    date = date + timedelta(hours=3)
    return date.strftime('%H:%M:%S %d/%m/%Y')

if len(sys.argv) < 2:
    print("Usage: python external_combine.py <basedir>")
    sys.exit(1)
else:
    basedir = sys.argv[1]

cities = ['istanbul', 'ankara', 'izmir']

result = []

for city in cities:
    with open(basedir + '/afetyardimalanlari-org-' + city + '.json', 'r') as f:
        data = json.load(f)

        for item in data:
            result.append({
                "type": "map-external-help-item",
                "name": item["name"],
                "latitude": item["location"]["latitude"],
                "longitude": item["location"]["longitude"],
                "lastUpdate": item["updates"][-1]["update"], # -1 since they sort by date in frontend
                "lastUpdateTime": convertUTCtoTurkeyTime(item["updates"][-1]["createDateTime"]), # We have to convert UTC to Turkey time
                "status": item["active"],
                "description": "Bu veri afetyardimalanlari.org'dan alınmıştır"
            })

out =  {
    "update_time": datetime.now().isoformat(),
    "map_data": result
}

with open(basedir + '/latest.json', 'w') as f:
    json.dump(out, f, ensure_ascii=False, allow_nan=False)
