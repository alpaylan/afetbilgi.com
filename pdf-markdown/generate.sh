#!/bin/bash

set -e

langs=("tr" "en" "ar" "ku")

pip install -r requirements.txt
npm i -g md-to-pdf@latest

aws s3 cp s3://cdn.afetbilgi.com/latest.json ./latest.json

mkdir md-generated
cd md-generated

for lang in ${langs[@]}; do
    mkdir $lang
    mkdir $lang/backups
    cd $lang
    python ../../pdf-markdown/main.py tr ../../latest.json afetbilgi.md
    md-to-pdf afetbilgi.md
    cp afetbilgi.md "backups/`date +%Y-%m-%d_%H-%M-%S`.md"
    cp afetbilgi.pdf "backups/`date +%Y-%m-%d_%H-%M-%S`.pdf"
    cd ..
done

cd ..

cities=$(python pdf-markdown/get_cities.py md-generated/tr/afetbilgi.md)

for city in $(echo $cities); do
    for lang in ${langs[@]}; do
        cd $lang
        python ../../pdf-markdown/main.py $lang ../../latest.json "$city.md" $city
        md-to-pdf "$city.md"
        cp "$city.md" "backups/$city-`date +%Y-%m-%d_%H-%M-%S`.md"
        cp "$city.pdf" "backups/$city-`date +%Y-%m-%d_%H-%M-%S`.pdf"
        cd ..
    done
done