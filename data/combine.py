import json

data_points = [
  { 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'path': 'datasets/barinma.json' },
  { 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'path': 'datasets/toplanma.json' },
#   { 'name_tr': 'Para Bağışı İmkanları', 'name_en': 'Money Donation', 'path': 'datasets/bagis.json' },
  { 'name_tr': 'Eşya Bağışı İmkanları','name_en': 'Other Donation',  'path': 'datasets/yardim_toplama_merkezleri.json' },
  { 'name_tr': 'Kızılay Kan Bağış Noktaları', 'name_en': 'Kızılay Blood Donation Places', 'path': 'datasets/blood.json' },
  { 'name': 'Önemli Telefon Numaraları', 'name_en': 'Crucial Phone Number', 'path': 'datasets/telefon.json' },
  { 'name': 'Önemli Web Siteleri', 'name_en': 'Useful Links', 'path': 'datasets/faydali_linkler.json' },
  { 'name': 'Faydalı Yazılar', 'name_en': 'Useful Articles' , 'path': 'datasets/yazilar.json' },
  { 'name': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'path': 'datasets/kokhucre.json' },
  { 'name': 'Veterinerler', 'name_en': 'Veterinarians', 'path': 'datasets/veteriner.json' },
  { 'name': 'Yemek', 'name_en': 'Food', 'path': 'datasets/yemek.json' },
]

result = {
    'type': 'question',
    'text_tr': 'Lütfen bilgi almak istediğiniz konuyu seçiniz.',
    'text_en': 'Please select a topic.',
    'text_ku': '',
    'text_at': '',
    'options': []
}

for data_point in data_points:
    with open(f"{data_point['path']}", "r", encoding="utf-8") as f:
        text = f.read().encode("utf-8")

        data = json.loads(text)

        result['options'].append({
            **data_point,
            'value': data,
        })

print(json.dumps(result, ensure_ascii=False))

