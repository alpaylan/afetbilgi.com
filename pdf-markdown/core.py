from typing import List

class MDTable:
    def __init__(self, headers: list, rows: List[List[str]]):
        self.headers = headers
        self.rows = rows

    def to_string(self):
        s = "| " + " | ".join(self.headers) + " |"

        s += "\n| " + " | ".join(["---"] * len(self.headers)) + " |"

        for row in self.rows:
            s += "\n| " + " | ".join(row) + " |"

        return s

class MDNode:
    def __init__(self, header: str, body: str, table: MDTable):
        self.header = header
        self.body = body
        self.table = table
        self.children = []

    def add_child(self, child: "MDNode"):
        self.children.append(child)

    def add_children(self, children):
        for c in children:
            self.children.append(c)

    def to_string(self, depth = 1):
        s = "#" * depth + " " + self.header

        if self.body != "":
            s += f"\n\n{self.body}"

        if self.table is not None:
            s += "\n\n" + self.table.to_string()

        for c in self.children:
            s += "\n\n" + c.to_string(depth + 1)

        return s

    def filter(self, city_filter):
        if city_filter is None:
            return

        new_children = []

        for c in self.children:
            if len(c.children) == 0:
                continue

            to_remove = []

            for cc in c.children:
                if cc.header != city_filter:
                    to_remove.append(cc.header)

            c.remove_children(to_remove)

            if len(c.children) > 0:
                new_children.append(c)

        self.children = new_children

    def remove_children(self, headers):
        new_children = []

        for c in self.children:
            if c.header not in headers:
                new_children.append(c)

        self.children = new_children