import aiohttp
import re

class BaseMapParser:

    @classmethod
    async def get_coordinates(cls, url):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.head(url, allow_redirects=True) as resp:
                    uu = str(resp.url)
                    match = re.search(r"@(\d+.\d+),(\d+.\d+)", uu)
                    if match:
                        return match.group(1), match.group(2)
                    return None
            except Exception as e:
                return None

