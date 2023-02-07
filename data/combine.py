import json

data_points = [
  { 'name': 'Geçici Barınma Alanları', 'path': 'barinma.json' },
  { 'name': 'Güvenli Toplanma Alanları', 'path': 'toplanma.json' },
  { 'name': 'Para Bağışı İmkanları', 'path': 'bagis.json' },
  { 'name': 'Eşya Bağışı İmkanları', 'path': 'yardim_toplama_merkezleri.json' },
  { 'name': 'Kızılay Kan Bağış Noktaları', 'path': 'blood.json' },
]

result = {
    'type': 'question',
    'text': 'Lütfen bilgi almak istediğiniz konuyu seçiniz.',
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

