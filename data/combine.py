import json

data_points = [
  { 'name_ar': 'ملاجئ مؤقتة', 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'name_ku': 'Bicîhbûna Demkî', 'path': 'datasets/barinma.json' },
  { 'name_ar': 'مناطق تجميع آمنة', 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'name_ku': 'Qadên Ewle Bo Kombûnê', 'path': 'datasets/toplanma.json' },
  { 'name_ar': 'مواقع توصيل الطعام', 'name': 'Yemek Dağıtım Yerleri', 'name_en': 'Food Distribution Center', 'name_ku': 'Cihên Belavkirina Xwarinê', 'path': 'datasets/yemek.json' },
  { 'name_ar': 'أرقام هواتف مهمة', 'name': 'Önemli Telefon Numaraları', 'name_en': 'Crucial Phone Number', 'name_ku': 'Numareyên Girîng', 'path': 'datasets/telefon.json' },
  { 'name_ar': 'مُرْتَادِي الشَّبَكَة مهمة', 'name': 'Önemli Web Siteleri', 'name_en': 'Useful Links', 'name_ku': ' Malperên Kêrhatî', 'path': 'datasets/faydali_linkler.json' },
  { 'name_ar': 'بَيَاطير', 'name': 'Veterinerler', 'name_en': 'Veterinarians', 'name_ku': 'Veterîner', 'path': 'datasets/veteriner.json' },
  { 'name_ar': 'فرص التبرع بالعناصر', 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ku': 'Bexşkirina Tiştan', 'path': 'datasets/yardim_toplama_merkezleri.json' },
  { 'name_ar': 'نقاط الهلال الأحمر للتبرع بالدم', 'name_tr': 'Kızılay Kan Bağış Noktaları', 'name_en': 'Kızılay Blood Donation Places', 'name_ku': 'Cihên Xwîn Dayînê yên Kizilay/ Heyva Sor', 'path': 'datasets/blood.json' },
  { 'name_ar': 'نقاط التبرع بالخلايا الجذعية', 'name': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'name_ku': 'Cihên bo bexşîna xaneyî bineretiyê', 'path': 'datasets/kokhucre.json' },
  { 'name_ar': 'نصوص مفيدة', 'name': 'Faydalı Yazılar', 'name_en': 'Useful Articles' , 'name_ku': 'Agahiyên Kêrhatî', 'path': 'datasets/yazilar.json' },
  { 'name': 'VPN', 'path': 'datasets/vpn.json' },
#   { 'name_tr': 'Para Bağışı İmkanları', 'name_en': 'Money Donation', 'path': 'datasets/bagis.json' },
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

