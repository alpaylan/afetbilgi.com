import pandas as pd
import json
import math
import re

## TODO: Make all langs in citymap same as the sheet
## Currently sheet has all caps city names while this map has capitilize()
## Fix Sheet to have city names Capital
## Fix Sheet to have a single Istanbul rather than Istanbul 1, Istanbul 2
## Fix this city_map to have all cities in the sheet
## I put extra tr-all-caps so that the code could work with existing google sheet names
city_map = {
    'tr-all-caps': ['ADANA', 'GAZİANTEP', 'MALATYA', 'DİYARBAKIR', 'ŞANLIURFA', 'KAHRAMANMARAŞ', 'OSMANİYE', 'AFYONKARAHİSAR', 'ADIYAMAN', 'KİLİS', 'MARDİN', 'HATAY', 'AMASYA', 'ANKARA', 'ANTALYA', 'BALIKESİR', 'BAYBURT', 'BİTLİS', 'BURSA', 'DENİZLİ', 'ERZURUM', 'ESKİŞEHİR', 'KAYSERİ', 'KIRKLARELİ', 'KONYA', 'KÜTAHYA', 'MERSİN', 'MUĞLA', 'MUŞ', 'NEVŞEHİR', 'RİZE', 'SAKARYA', 'SİVAS', 'ŞIRNAK', 'TRABZON', 'UŞAK', 'VAN'],
    'tr': ['Adana', 'Gaziantep', 'Malatya', 'Diyarbakır', 'Şanlıurfa', 'Kahramanmaraş', 'Osmaniye', 'Afyonkarahi̇sar' ,'Adıyaman', 'Kilis', 'Mardin', 'Hatay', 'Amasya', 'Ankara', 'Antalya', 'Balıkesir', 'Bayburt', 'Bitlis', 'Bursa', 'Denizli', 'Erzurum', 'Eskişehir', 'Kayseri', 'Kırklareli', 'Konya', 'Kütahya', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Rize', 'Sakarya', 'Sivas', 'Şırnak', 'Trabzon', 'Uşak', 'Van'],
    'en': ['Adana', 'Gaziantep', 'Malatya', 'Diyarbakır', 'Sanliurfa', 'Kahramanmaras', 'Osmaniye', 'Afyonkarahi̇sar' ,'Adiyaman', 'Kilis', 'Mardin', 'Hatay', 'Amasya', 'Ankara', 'Antalya', 'Balikesir', 'Bayburt', 'Bitlis', 'Bursa', 'Denizli', 'Erzurum', 'Eskisehir', 'Kayseri', 'Kirklareli', 'Konya', 'Kutahya', 'Mersin', 'Mugla', 'Mus', 'Nevsehir', 'Rize', 'Sakarya', 'Sivas', 'Sırnak', 'Trabzon', 'Usak', 'Van'],
    'ku': ['Adana- Edene', 'Gaziantep- Dîlok', 'Malatya- Meletî', 'Diyarbakır- Amed', 'Şanlıurfa- Riha', 'Kahramanmaraş- Gurgum', 'Osmaniye', 'Afyonkarahi̇sar-' ,'Adıyaman- Semsûr', 'Kilis- Kilîs', 'Mardin- Mêrdîn', 'Hatay- Xetay', 'Amasya', 'Ankara- Enqere', 'Antalya', 'Balıkesir', 'Bayburt', 'Bitlis- Bedlîs', 'Bursa', 'Denizli', 'Erzurum- Erzêrom', 'Eskişehir', 'Kayseri- Qeyserî', 'Kırklareli', 'Konya- Qonye', 'Kütahya', 'Mersin- Mêrsîn', 'Muğla', 'Muş- Mûş', 'Nevşehir', 'Rize', 'Sakarya', 'Sivas- Sêwas', 'Şırnak-Şirnex', 'Trabzon', 'Uşak', 'Van- Wan']
}

# TODO: Once the city_map above and google sheet is aligned change this FLAG to True
# I put it False so that current version can also run
is_sheet_and_city_map_aligned = False


def remove_tabs_return_carriage(line):
  return re.sub('[\t\r]', '', line)

def assign_dict_if_key_exists(dict,key):
  return dict[key] if key in dict else ""

def transform_to_en_keys(turkish_keys_dict,city_name):
  json = dict()
  json["city"] = city_name
  json["name"] = assign_dict_if_key_exists(turkish_keys_dict,"Şube Adı")
  json["head"] = assign_dict_if_key_exists(turkish_keys_dict,"Şube Başkanı") 
  json["address"] = assign_dict_if_key_exists(turkish_keys_dict,"Şube Adresi")
  json["phone_number"] = assign_dict_if_key_exists(turkish_keys_dict,"Telefon No")
  json["cell_phone_number"] = assign_dict_if_key_exists(turkish_keys_dict,"Cep Telefonu")
  json["Fax"] = assign_dict_if_key_exists(turkish_keys_dict,"Fax")
  return json

def parse_address(addr,city_name):
  json = dict()
  addr = remove_tabs_return_carriage(addr)
  addr_parts= addr.split('\n')
  addr_parts_map = dict()

  for addr_part in addr_parts:
    map_key_val_values = addr_part.split(':',1)
    if(len(map_key_val_values) == 2 ):
      addr_parts_map[map_key_val_values[0].strip()] = map_key_val_values[1].strip()
  
  json = transform_to_en_keys(addr_parts_map,city_name)
  return json

def prepare_option_data(option,record,city_name,option_str_language):
  option[option_str_language] = []
  for k,v in record.items():
    if isinstance(v,str) and k != city_name  :
      value_elem = {
          "type" : "data",
          "data" : parse_address(v,city_name)
      }
      option[option_str_language].append(value_elem)
  return option

def main():
    ## TODO: Change it to google sheet if necessary
    url = f"../blood-donation.csv"

    output_filename= f"../datasets/new_blood.json"

    df = pd.read_csv(url, encoding="utf-8")
    df = df.rename(columns={
        "Şehir": "city",
        "Lokasyon": "location"
    })

    json_obj = {
        "type": "question",
        "autocompleteHint": "Şehir",
        "options": [
        ]
    }
    options = json_obj["options"]

    records = df.to_dict(orient='records')
    for i in range(1,len(records)):
        city_name = records[i]["city"]
        del records[i]["city"]

        option= dict()
        
        # Some city names in sheet are not in the city_maps  header in this file, if so skip 
        # Once the google sheet and city_maps are the same, change the FLAG
        if (is_sheet_and_city_map_aligned):
            if(city_name in city_map['tr']  ):
                option['name_en'] = city_map['en'][city_map['tr-all-caps'].index(city_name)]
                option['name_tr'] = city_map['tr'][city_map['tr-all-caps'].index(city_name)]
                option['name_ku'] = city_map['ku'][city_map['tr-all-caps'].index(city_name)]
            
                option = prepare_option_data(option,records[i],city_name,"value_tr")
                option = prepare_option_data(option,records[i],city_name,"value_en")
                option = prepare_option_data(option,records[i],city_name,"value_ku")
                
                json_obj["options"].append(option) 
        else:  
            if(city_name in city_map['tr-all-caps']  ):
                option['name_en'] = city_map['en'][city_map['tr-all-caps'].index(city_name)]
                option['name_tr'] = city_map['tr'][city_map['tr-all-caps'].index(city_name)]
                option['name_ku'] = city_map['ku'][city_map['tr-all-caps'].index(city_name)]
            
                option = prepare_option_data(option,records[i],city_name,"value_tr")
                option = prepare_option_data(option,records[i],city_name,"value_en")
                option = prepare_option_data(option,records[i],city_name,"value_ku")
                
                json_obj["options"].append(option)
            

        with open(output_filename, "w", encoding="utf-8") as f:
            json.dump(json_obj, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()

