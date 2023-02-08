import json

data_points = [
  { 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'name_ku': 'Bicîhbûna Demkî', 'path': 'datasets/barinma.json' },
  { 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'name_ar': 'Qadên Ewle Bo Kombûnê', 'path': 'datasets/toplanma.json' },
#   { 'name_tr': 'Para Bağışı İmkanları', 'name_en': 'Money Donation', 'path': 'datasets/bagis.json' },
  { 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ar': 'Bexşkirina Tiştan', 'path': 'datasets/yardim_toplama_merkezleri.json' },
  { 'name_tr': 'Kızılay Kan Bağış Noktaları', 'name_en': 'Kızılay Blood Donation Places', 'name_ar': 'Cihên Xwîn Dayînê yên Kizilay/ Heyva Sor', 'path': 'datasets/blood.json' },
  { 'name': 'Önemli Telefon Numaraları', 'name_en': 'Crucial Phone Number', 'name_ar': 'Numareyên Girîng', 'path': 'datasets/telefon.json' },
  { 'name': 'Önemli Web Siteleri', 'name_en': 'Useful Links', 'name_ar': ' Malperên Kêrhatî', 'path': 'datasets/faydali_linkler.json' },
  { 'name': 'Faydalı Yazılar', 'name_en': 'Useful Articles' , 'name_ar': 'Agahiyên Kêrhatî', 'path': 'datasets/yazilar.json' },
  { 'name': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'name_ar': 'XZY', 'path': 'datasets/kokhucre.json' },
  { 'name': 'Veterinerler', 'name_en': 'Veterinarians', 'name_ar': 'Veterîner', 'path': 'datasets/veteriner.json' },
  { 'name': 'Yemek', 'name_en': 'Food', 'path': 'datasets/yemek.json' },
]

result = {
    'type': 'question',
    'text_tr': 'Lütfen bilgi almak istediğiniz konuyu seçiniz.',
    'text_en': 'Please select a topic.',
    'text_ku': 'i kerema xwe mijara hûn dixwazin agahdariyê jê bigirin hilbijêrin',
    'text_ar': 'الرجاء تحديد الموضوع الذي تريد تلقي معلومات عنه',
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

