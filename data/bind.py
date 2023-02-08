import json
import os

def convert(translations):
    base_data = translations[0][1]

    if 'type' in base_data and base_data['type'] == 'question':
        for lang, tr in translations:
            base_data[f"text_{lang}"] = tr['text']

        if 'text' in base_data:
            del base_data['text']

        for index, option in enumerate(base_data['options']):
            for lang, tr in translations:
                if len(tr['options']) > index:
                    option[f"name_{lang}"] = tr['options'][index]['name']

                    if 'name' in option:
                        del option['name']

            convert(
                [[lang, tr['options'][index]] for lang, tr in translations if len(tr['options']) > index]
            )

    elif 'value' in base_data:
        if 'type' in base_data['value'] and base_data['value']['type'] == 'question':
            convert(
                [[lang, tr['value']] for lang, tr in translations]
            )
        else:
            pass

files = ['bagis.json', 'toplanma.json']

try:
    os.mkdir('combined')
except:
    pass

for f_name in files:
    translations = []

    with open(f"tr/{f_name}", "r", encoding="utf-8") as f:
        text = f.read().encode("utf-8")
        data = json.loads(text)

        translations.append(['tr', data])

    with open(f"eng/{f_name}", "r", encoding="utf-8") as f:
        text = f.read().encode("utf-8")
        data = json.loads(text)

        translations.append(['en', data])

    try:
        with open(f"kur/{f_name}", "r", encoding="utf-8") as f:
            text = f.read().encode("utf-8")
            data = json.loads(text)

            translations.append(['ku', data])
    except:
        pass

    convert(translations)

    out = json.dumps(translations[0][1], indent=4, ensure_ascii=False)

    with open(f"combined/{f_name}", "w", encoding="utf-8") as f:
        f.write(out)
