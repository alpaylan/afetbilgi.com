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