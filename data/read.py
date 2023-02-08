import json

with open("combined/barinma.json", "r") as f:
    text = f.read().encode("utf-8")

    data = json.loads(text)

    group1 = []
    group2 = []
    group3 = []

    for item in data['options']:
        group1.append(item['name_tr'])
        group2.append(item['name_en'])
        group3.append(item['name_ku'])

    print(group1)
    print(group2)
    print(group3)


