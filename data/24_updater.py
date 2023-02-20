import sys
import json
import hashlib

import requests

if len(sys.argv) >= 2:
    new_data_path = sys.argv[1]
else:
    sys.exit(1)

def hash_dist(a):
    return hashlib.md5(json.dumps(a).encode("utf-8")).hexdigest()

def get_name(option):
    if "name" in option:
        return option["name"]

    elif "name_tr" in option:
        return option["name_tr"]

    assert False

def walk_by_key(option1, option2, key):
    compare_set = set()

    if option1:
        for item in option1[key]:
            compare_set.add(hash_dist(item))

    for item in option2[key]:
        item["added_last_day"] = hash_dist(item) not in compare_set

def walk_by_type(option1, option2):
    if "type" in option2 and option2["type"] == "question":
        group1 = dict()
        group2 = dict()

        if option1:
            for item in option1["options"]:
                group1[get_name(item)] = item

        for item in option2["options"]:
            group2[get_name(item)] = item

        for key in group2.keys():
            walk_by_type(group1[key]["value"] if key in group1 else None, group2[key]["value"])

    elif "data" in option2:
        option1 = option1["data"] if option1 and "data" in option1 else None
        option2 = option2["data"]

        if option1:
            assert option1["dataType"] == option2["dataType"]

        if "phones" in option2:
            walk_by_key(option1, option2, "phones")

        elif "vets" in option2:
            walk_by_key(option1, option2, "vets")

        elif "items" in option2:
            walk_by_key(option1, option2, "items")

        elif "accounts" in option2:
            walk_by_key(option1, option2, "accounts")

        elif "usefulLinks" in option2:
            walk_by_key(option1, option2, "usefulLinks")

        elif "transportations" in option2:
            walk_by_key(option1, option2, "transportations")

        elif "articles" in option2:
            walk_by_key(option1, option2, "articles")

        elif "dataType" in option2 and option2["dataType"] == "blood-donationlist":
            pass

        elif "dataType" in option2 and option2["dataType"] == "mobile-toilets":
            pass

        else:
            print(option2["dataType"])
            assert False

base_data = requests.get("https://cdn.afetbilgi.com/2023-02-20_16-12-37.json")

with open(new_data_path, "r") as f:
    new_data = json.load(f)

base_data_map = dict()
for item in base_data.json()["options"]:
    base_data_map[item["path"]] = item

for option2 in new_data["options"]:
    if option2["path"] in base_data_map:
        option1 = base_data_map[option2["path"]]

        walk_by_type(option1["value"], option2["value"])

print(json.dumps(new_data, ensure_ascii=False, allow_nan=False, indent=4))
