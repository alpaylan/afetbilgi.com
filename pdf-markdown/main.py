import os
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

    return n

def parse_option_node(opt, translation, lang):
    if opt["value"]["type"] == "question":
        return parse_question(get_name(opt, lang), opt["value"]["options"], translation, lang)
    elif opt["value"]["type"] == "data":
        return parse_data(get_name(opt, lang), opt["value"]["data"], translation)
    else:
        raise Exception(f"Unknown node type: {opt['type']}")

def parse_data(title, data, translation):
    print("Parse data: " + title)

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
    if len(sys.argv) != 4:
        print(f"Usage: python3 {sys.argv[0]} <lang> <input file> <output file>")
        exit(1)

    lang = sys.argv[1]
    source = sys.argv[2]
    target = sys.argv[3]

    if lang not in LANGS:
        print(f"Unknown language: {lang}")
        exit(1)

    file_path = "/".join(os.path.realpath(__file__).split("/")[:-1])

    with open(f"{file_path}/../fe/src/utils/locales/{lang}/translation.json", "r") as f:
        translation = json.load(f)

    with open(source, "r") as f:
        data = json.load(f)

    md_nodes = []

    for node in data["options"]:
        n = parse_node(node, translation, lang)
        
        if n is not None:
            md_nodes.append(n)

    now = datetime.datetime.now(pytz.timezone("Europe/Istanbul")).strftime("%d.%m.%Y %H:%M:%S")
    root = MDNode("afetbilgi.com", translation["pdf_notice"].format(date=now), None)
    root.add_children(md_nodes)
    
    with open(target, "w") as f:
        s = CUSTOM_MD_SPEC + root.to_string()
        f.write(s)

if __name__ == "__main__":
    main()
