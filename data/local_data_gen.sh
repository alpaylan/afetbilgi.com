#bin/bash
# Description: This script is used to generate local data files from the latest datasets
echo "Generating local data files from the latest datasets"
SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
mkdir -p $SCRIPT_PATH/latest_datasets
python $SCRIPT_PATH/parsers/yemek.py $SCRIPT_PATH/latest_datasets/yemek.json
python $SCRIPT_PATH/parsers/yazilar.py $SCRIPT_PATH/latest_datasets/yazilar.json
python $SCRIPT_PATH/parsers/toplanma.py $SCRIPT_PATH/latest_datasets/toplanma.json
python $SCRIPT_PATH/parsers/barinma.py $SCRIPT_PATH/latest_datasets/barinma.json
python $SCRIPT_PATH/parsers/kokhucre.py $SCRIPT_PATH/latest_datasets/kokhucre.json
python $SCRIPT_PATH/parsers/telefonnumaralari.py $SCRIPT_PATH/latest_datasets/telefon.json
python $SCRIPT_PATH/parsers/eczane.py $SCRIPT_PATH/latest_datasets/eczane.json
python $SCRIPT_PATH/parsers/faydalilinkler.py $SCRIPT_PATH/latest_datasets/faydali_linkler.json
python $SCRIPT_PATH/parsers/veteriner.py $SCRIPT_PATH/latest_datasets/veteriner.json
python $SCRIPT_PATH/parsers/yardim_toplama_merkezleri.py $SCRIPT_PATH/latest_datasets/yardim_toplama_merkezleri.json
python $SCRIPT_PATH/parsers/tahliye_parser.py $SCRIPT_PATH/latest_datasets/tahliye.json
python $SCRIPT_PATH/parsers/ulasim_parser.py $SCRIPT_PATH/latest_datasets/ulasim.json
python $SCRIPT_PATH/parsers/hastane.py $SCRIPT_PATH/latest_datasets/hastane.json

cp $SCRIPT_PATH/datasets/vpn.json $SCRIPT_PATH/latest_datasets/vpn.json
cp $SCRIPT_PATH/datasets/twitter_account.json $SCRIPT_PATH/latest_datasets/twitter_account.json
cp $SCRIPT_PATH/datasets/blood.json $SCRIPT_PATH/latest_datasets/blood.json
cp $SCRIPT_PATH/datasets/donation_links.json $SCRIPT_PATH/latest_datasets/donation_links.json

python $SCRIPT_PATH/combine.py $SCRIPT_PATH/latest_datasets > $SCRIPT_PATH/../fe/public/latest.json
echo "Data files generated successfully"