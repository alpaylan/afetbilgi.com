import os
import re
import sys
import json
import pytz
import datetime

from core import MDNode
from parsers import data_type_parsers

LANGS = ["tr", "en", "ku", "ar"]

CUSTOM_MD_SPEC = """
---
stylesheet: https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css
body_class: markdown-body
css: |-
  .page-break { page-break-after: always; }
  .markdown-body { font-size: 11px; }
  .markdown-body pre > code { white-space: pre-wrap; }
pdf_options:
  format: a4
  margin: 10mm 10mm
---

""".lstrip()

def parse_node(node, translation, lang):
    if node["value"]["type"] == "question":
        return parse_question(get_name(node, lang), node["value"]["options"], translation, lang)
    elif node["value"]["type"] == "data":
        return parse_data(get_name(node, lang), node["value"]["data"], translation)
    else:
        raise Exception(f"Unknown node type: {node['type']}")

def parse_question(title, options, translation, lang):
    children = []

    for opt in options:
        n = parse_option_node(opt, translation, lang)

        if n is not None:
            children.append(n)

    n = MDNode(title, "", None)
    n.add_children(children)

    if len(n.children) == 0:
        return None

    return n

def parse_option_node(opt, translation, lang):
    if opt["value"]["type"] == "question":
        return parse_question(get_name(opt, lang), opt["value"]["options"], translation, lang)
    elif opt["value"]["type"] == "data":
        return parse_data(get_name(opt, lang), opt["value"]["data"], translation)
    else:
        raise Exception(f"Unknown node type: {opt['type']}")

def parse_data(title, data, translation):
    f = data_type_parsers.get(data["dataType"], None)

    if f is None:
        print("Unknown data type: " + data["dataType"])
        return None

    table = f(data, translation)
    return MDNode(title, "", table)

def get_name(x, lang):
    k = f"name_{lang}"
    if k in x:
        return x[k]
    else:
        try:
            return x["name"]
        except Exception as e:
            raise Exception(f"Name not found for {x} ({lang}): {e}")

def main():
    if len(sys.argv) != 5:
        print(f"Usage: python3 {sys.argv[0]} <lang> <input file> <output file> <city>")
        exit(1)

    lang = sys.argv[1]
    source = sys.argv[2]
    target = sys.argv[3]
    city_filter = sys.argv[4]

    if city_filter == "all":
        city_filter = None

    if lang not in LANGS:
        print(f"Unknown language: {lang}")
        exit(1)

    file_path = "/".join(os.path.realpath(__file__).split("/")[:-1])

    with open(f"{file_path}/../fe/src/utils/locales/{lang}/translation.json", "r") as f:
        translation = json.load(f)

    with open(f"{file_path}/../data/parsers/utils/il_translate.json", "r") as f:
        city_translate_table = json.load(f)

    with open(source, "r") as f:
        data = json.load(f)

    md_nodes = []

    for node in data["options"]:
        n = parse_node(node, translation, lang)
        
        if n is not None:
            md_nodes.append(n)

    now = datetime.datetime.now(pytz.timezone("Europe/Istanbul")).strftime("%d.%m.%Y %H:%M:%S")
    
    title = "afetbilgi.com"
    if city_filter is not None:
        title += f" - {city_filter}"

    root = MDNode(title, translation["pdf_notice"].format(date=now), None, city_translate_table, lang)

    root.add_children(md_nodes)
    root.sort_children()
    root.filter(city_filter)

    with open(target, "w") as f:
        s = CUSTOM_MD_SPEC + root.to_string()

        # If the city filter is specified, remove 3-depth headers and make 4-depth headers 3-depth
        if city_filter is not None:
            s = re.sub(r"^### .*$", "", s, flags=re.MULTILINE)
            s = re.sub(r"^#### ", "### ", s, flags=re.MULTILINE)

        f.write(s)

if __name__ == "__main__":
    main()
