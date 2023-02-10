import asyncio
from datetime import datetime
import json
import sys

from barinma import BarinmaParser
from eczane import EczaneParser
from toplanma import ToplanmaParser
from veteriner import VeterinerParser
from yemek import YemekParser


async def main():

    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <output-file>")
        sys.exit(1)

    out_path = sys.argv[1]

    parsers = [
        BarinmaParser,
        EczaneParser,
        ToplanmaParser,
        VeterinerParser,
        YemekParser,
    ]


    data = []

    for parser in parsers:
        data.append(await parser.parse())

    res =  {
        "update_time": datetime.now().isoformat(),
        "map_data": data
    }

    with open(out_path, "w+", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, allow_nan=False)

if __name__ == "__main__":
    asyncio.run(main())
