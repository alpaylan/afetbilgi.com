import json

data_points = [
  { 'name': 'Temporary Accommodation Places', 'path': 'barinma.json' },
  { 'name': 'Safe Gathering Places', 'path': 'toplanma.json' },
  { 'name': 'Money Donation', 'path': 'en/bagis.json' },
  { 'name': 'Other Donation', 'path': 'yardim_toplama_merkezleri.json' },
  { 'name': 'Kızılay Blood Donation Places', 'path': 'blood.json' },
]

result = {
    'type': 'question',
    'text': 'Please select a topic.',
    'options': []
}

for data_point in data_points:
    with open(f"{data_point['path']}", "r", encoding="utf-8") as f:
        text = f.read().encode("utf-8")

        data = json.loads(text)

        result['options'].append({
            'name': data_point['name'],
            'value': data,
        })

print(json.dumps(result, ensure_ascii=False))

