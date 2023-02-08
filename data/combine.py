import json

data_points = [
  { 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'path': 'combined/barinma.json' },
  { 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'path': 'combined/toplanma.json' },
#   { 'name_tr': 'Para Bağışı İmkanları', 'name_en': 'Money Donation', 'path': 'combined/bagis.json' },
  { 'name_tr': 'Yardım Toplama İmkanları','name_en': 'Other Donation',  'path': 'combined/yardim_toplama_merkezleri.json' },
  { 'name_tr': 'Kızılay Kan Bağış Noktaları', 'name_en': 'Kızılay Blood Donation Places', 'path': 'combined/blood.json' },
  { 'name': 'Önemli Telefon Numaraları', 'name_en': 'Crucial Phone Number', 'path': 'combined/telefon.json' },
  { 'name': 'Önemli Web Siteleri', 'name_en': 'Useful Links', 'path': 'faydali_linkler.json' },
  { 'name': 'Faydalı Yazılar', 'name_en': 'Useful Articles' , 'path': 'yazilar.json' },
  { 'name': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'path': 'kokhucre.json' },
  { 'name': 'Veterinerler', 'name_en': 'Veterinarians', 'path': 'veteriner.json' },
]

result = {
    'type': 'question',
    'text_tr': 'Lütfen bilgi almak istediğiniz konuyu seçiniz.',
    'text_en': 'Please select a topic.',
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

