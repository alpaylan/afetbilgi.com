#!/bin/bash

set -e

langs=("tr" "en" "ar" "ku")

pip install -r requirements.txt
npm i -g md-to-pdf@latest

aws s3 cp s3://cdn.afetbilgi.com/latest.json ./latest.json

mkdir md-generated
cd md-generated

mkdir backups

for lang in ${langs[@]}; do
    mkdir $lang
    mkdir backups/$lang
    cd $lang
    python ../../pdf-markdown/main.py $lang ../../latest.json afetbilgi.md all
    md-to-pdf afetbilgi.md
    cp afetbilgi.md "../backups/$lang/`date +%Y-%m-%d_%H-%M-%S`.md"
    cp afetbilgi.pdf "../backups/$lang/`date +%Y-%m-%d_%H-%M-%S`.pdf"
    cd ..
done

python ../pdf-markdown/get_cities.py tr/afetbilgi.md index.json

for city in $(cat index.json | jq -r '.[]'); do
    for lang in ${langs[@]}; do
        cd $lang
        
        python ../../pdf-markdown/main.py $lang ../../latest.json "$city.md" $city
        md-to-pdf "$city.md"

        cd ..
    done
done
