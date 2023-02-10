import sys
import json
import datetime

from core import MDNode
from parsers import data_type_parsers

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

def parse_node(node):
    print("Parse node: " + nametr_or_name(node))

    if node["value"]["type"] == "question":
        return parse_question(nametr_or_name(node), node["value"]["options"])
    elif node["value"]["type"] == "data":
        return parse_data(nametr_or_name(node), node["value"]["data"])
    else:
        raise Exception(f"Unknown node type: {node['type']}")

def parse_question(title, options):
    print("Parse question: " + title)

    children = []

    for opt in options:
        print(f"Calling parse_option_node: {opt}")
        n = parse_option_node(opt)

        if n is not None:
            children.append(n)

    n = MDNode(title, "", None)
    n.add_children(children)

    return n

def parse_option_node(opt):
    if opt["value"]["type"] == "question":
        return parse_question(nametr_or_name(opt), opt["value"]["options"])
    elif opt["value"]["type"] == "data":
        return parse_data(nametr_or_name(opt), opt["value"]["data"])
    else:
        raise Exception(f"Unknown node type: {opt['type']}")

def parse_data(title, data):
    print("Parse data: " + title)

    f = data_type_parsers.get(data["dataType"], None)

    if f is None:
        print("Unknown data type: " + data["dataType"])
        return None

    table = f(data)
    return MDNode(title, "", table)

def nametr_or_name(x):
    if "name_tr" in x:
        return x["name_tr"]
    else:
        return x["name"]

def main():
    if len(sys.argv) != 3:
        print(f"Usage: python3 {sys.argv[0]} <input file> <output file>")
        exit(1)

    source = sys.argv[1]
    target = sys.argv[2]

    with open(source, "r") as f:
        data = json.load(f)

    md_nodes = []

    for node in data["options"]:
        n = parse_node(node)
        
        if n is not None:
            md_nodes.append(n)

    now = datetime.datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    root = MDNode("afetbilgi.com", f"Bu belge [afetbilgi.com](https://afetbilgi.com) sitesinden alınmıştır. Verilerin son doğrulanma tarihi: {now}.", None)
    root.add_children(md_nodes)
    
    with open(target, "w") as f:
        s = CUSTOM_MD_SPEC + root.to_string()
        f.write(s)

if __name__ == "__main__":
    main()
