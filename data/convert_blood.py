
import json

out = {
    "type": "question",
    "text": "Hangi şehirde kan verebilirsiniz?",
    "options": []
}
with open(f"blood_1.json", "r") as f:
    text = f.read().encode("utf-8")

    data = json.loads(text)
    for item in data:
        item["dataType"] ="blood-donation"

        out['options'].append({
            "name": item["city"],
            "value": {
                "type": "data",
                "data": item,
            }
        })

    print(json.dumps(out, indent=4, ensure_ascii=False))
