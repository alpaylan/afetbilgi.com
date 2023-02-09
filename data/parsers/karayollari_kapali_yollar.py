import re
import json
import requests
from lxml import html

PAGE_URL = "https://www.kgm.gov.tr/Sayfalar/KGM/SiteTr/YolDanisma/TrafigeKapaliYollar.aspx"

def strip(s):
    return re.sub(r"\s+", " ", s).strip()

def main():
    pg = requests.get(PAGE_URL)

    if pg.status_code != 200:
        raise Exception("Page not found")

    tree = html.fromstring(pg.text)
    table = tree.xpath('//table[@class="table table-bordered"]')

    if len(table) == 0:
        raise Exception("Table not found")

    table = table[0]
    headers = [{"name": strip(x.text_content()), "colspan": int(x.attrib.get("colspan", 1))} for x in table.xpath("./tr[1]/td")]

    data = []

    for row in table.xpath("./tr")[1:]:
        dp = {}
        i = 0

        for header in headers:
            inner = []
            for _ in range(header["colspan"]):
                inner.append(strip(row.xpath("./td")[i].text_content()))
                i += 1

            if len(inner) == 1:
                inner = inner[0]
                
            dp[header["name"]] = inner

        data.append(dp)

    print(json.dumps({
        "type": "data",
        "data": {
            "dataType": "closed-roads",
            "items": data
        }
    }, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()