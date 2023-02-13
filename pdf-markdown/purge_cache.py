import os
import sys
import json
import requests

PREFIXES = [
    "https://pdf.afetbilgi.com/{lang}/{name}.pdf",
    "https://cdn.afetbilgi.com/md-pdf/{lang}/{name}.pdf",
]

PREDEF_NAMES = ["afetbilgi"]
PREDEF_FILES = [
    "https://pdf.afetbilgi.com",
    "https://pdf.afetbilgi.com/tr",
    "https://pdf.afetbilgi.com/en",
    "https://pdf.afetbilgi.com/ar",
    "https://pdf.afetbilgi.com/ku",
    "https://pdf.afetbilgi.com/index.json",
    "https://cdn.afetbilgi.com/md-pdf/index.json",
]

LANGS = ["tr", "en", "ar", "ku"]

FILES_PER_REQUEST = 30

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python3 {sys.argv[0]} <data-json>")
        sys.exit(1)

    cloudflare_zone = os.environ.get("CF_ZONE")
    cloudflare_token = os.environ.get("CF_TOKEN")

    if cloudflare_zone is None or cloudflare_token is None:
        print("Error: Missing CF_ZONE or CF_TOKEN environment variables")
        sys.exit(1)

    with open(sys.argv[1], "r") as f:
        index = json.load(f)

    index += PREDEF_NAMES
    files = PREDEF_FILES[:]

    for name in index:
        for prefix in PREFIXES:
            for lang in LANGS:
                files.append(prefix.format(lang=lang, name=name))

    print("Will purge cache for", len(files), "files:", files)

    for i in range(0, len(files), FILES_PER_REQUEST):
        purge_file_cache(files[i:i+FILES_PER_REQUEST], cloudflare_zone, cloudflare_token)

def purge_file_cache(files, cloudflare_zone, cloudflare_token):
    headers = {
        "Authorization": f"Bearer {cloudflare_token}",
        "Content-Type": "application/json",
    }

    r = requests.post(
        f"https://api.cloudflare.com/client/v4/zones/{cloudflare_zone}/purge_cache",
        headers=headers, json={
            "files": files,
        })

    if r.status_code != 200:
        print("Error:", r.status_code, r.text)
        sys.exit(1)

    print("++ Purged cache for", len(files), "files")

if __name__ == "__main__":
    main()