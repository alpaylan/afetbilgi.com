import json

with open("data/toplanma.json", "r", encoding="utf-8") as f:
    text = f.read().encode("utf-8")

    data = json.loads(text)

    result = []

    for key in data.keys():
        result.append({
            "name": key,
            "value": {
                "type": "data",
                "value": {
                    "data-type": "item-list",
                    "items": data[key],
                },
            },
        })
        print(key)

    result = {
        "type": "question",
        "text": "Hangi şehir?",
        "options": result
    }

    print(json.dumps(result, indent=4, ensure_ascii=False))
