import json

with open("data/yardim_toplama_merkezleri.json", "r", encoding="utf-8") as f:
    text = f.read().encode("utf-8")

    data = json.loads(text)

    result = dict()
    for item in data:
        if item["city"] not in result:
            result[item["city"]] = {
                "type": "data",
                "data": {
                    "data-type": "item-list",
                    "items": [],
                }
            }

        result[item["city"]]["data"]["items"].append(item)

    result2 = []

    for key in result.keys():
        result2.append({
            "name": key,
            "value": result[key]
        })

    result = {
        "type": "question",
        "text": "Hangi şehir?",
        "options": result2
    }

    print(json.dumps(result, indent=4, ensure_ascii=False))
