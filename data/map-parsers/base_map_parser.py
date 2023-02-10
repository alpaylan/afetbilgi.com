import aiohttp
import re

class BaseMapParser:

    @classmethod
    async def get_coordinates(cls, url):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.head(url, allow_redirects=True) as resp:
                    uu = str(resp.url)

                    try:
                        return uu.split("data=")[1].split("!3d")[1].split("!16")[0].split("!4d")
                    except:
                        return None
            except Exception as e:
                return None

