import re
from urllib.parse import urlparse

from core import MDTable

empty_space_replace_regex = re.compile(r"[\n\r\t]+")

def phone_or_str(x):
    if x == "None" or x is None or x == "" or x == "-":
        return "-"
    
    if "-" in x:
        return x

    return f"[{x}](tel:{x.replace(' ', '')})"

def link_or_str(x, label):
    p = urlparse(x)

    if p.scheme == "" or p.netloc == "":
        return x
    
    return f"[{label}]({x})"

def str_or_list(x):
    if isinstance(x, list):
        return ", ".join(x)
    else:
        return str(x).strip()

def str_or_raw_list(x):
    if isinstance(x, list):
        return x
    else:
        return str(x).strip()

def process_rows(r):
    rr =  list(map(str.strip, map(str, r.values())))

    rows = []

    for i in range(len(rr)):
        if rr[i] == "None" or rr[i] is None:
            rows.append("-")
        else:
            #rows.append(rr[i].replace("\n", " - "))
            rows.append(empty_space_replace_regex.sub(" - ", rr[i]))
    
    return rows

def process_rows_list(r):
    rr = list(map(str_or_list, r.values()))

    rows = []

    for i in range(len(rr)):
        if rr[i] == "None" or rr[i] is None:
            rows.append("-")
        else:
            # rows.append(rr[i].replace("\n", " - "))
            rows.append(empty_space_replace_regex.sub(" - ", rr[i]))

    return rows

def process_rows_raw_list(r):
    rr = list(map(str_or_raw_list, r.values()))

    rows = []

    for i in range(len(rr)):
        if isinstance(rr[i], list):
            rows.append(rr[i])
        elif rr[i] == "None" or rr[i] is None:
            rows.append("-")
        else:
            # rows.append(rr[i].replace("\n", " - "))
            rows.append(empty_space_replace_regex.sub(" - ", rr[i]))

    return rows

def parse_city_accom(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[2] != "-":
            rr[2] = link_or_str(rr[2], t["source"])
        
        if rr[3] != "-":
            rr[3] = link_or_str(rr[3], t["button.google_maps"])
    
        rows.append(rr)

    return MDTable([t["city"], t["location"], t["source"], t["address"], t["data.transportation.validationDate"]], rows)

def parse_gathering(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[1] != "-":
            rr[1] = link_or_str(rr[1], t["button.google_maps"])

        if rr[2] != "-":
            rr[2] = link_or_str(rr[2], t["source"])

        rows.append(rr)

    return MDTable([t["location"], t["map"], t["source"]], rows)

def parse_food(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[1] != "-":
            rr[1] = link_or_str(rr[1], t["button.google_maps"])
        
        if rr[2] != "-":
            rr[2] = link_or_str(rr[2], t["source"])

        rr[3] = phone_or_str(rr[3])

        rows.append(rr)

    return MDTable([t["location"], t["address"], t["source"], t["telephone"], t["last_update"], "Güncelleme Saati (Update Time)"], rows)

def parse_pharmacy(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[3] != "-":
            rr[3] = link_or_str(rr[3], t["button.google_maps"])

        rows.append(rr)

    return MDTable([t["city"], t["district"], t["address"], t["map"]], rows)

def parse_phones(data, t):
    rows = []

    for r in data["phones"]:
        rr = process_rows(r)

        rr[1] = phone_or_str(rr[1])

        rows.append(rr)

    return MDTable([t["name"], t["telephone"]], rows)

def parse_links(data, t):
    rows = []

    for r in data["usefulLinks"]:
        rr = process_rows(r)

        # Extract the domain from the URL at rr[1]:
        domain = urlparse(rr[1]).netloc
        rr[1] = link_or_str(rr[1], domain)

        rows.append(rr)

    return MDTable([t["name"], t["website"]], rows)

def parse_vets(data, t):
    rows = []

    for r in data["vets"]:
        rr = process_rows_raw_list(r)

        rr[1] = ", ".join(list(map(phone_or_str, rr[1])))
        rr[3] = link_or_str(rr[3], t["button.google_maps"])

        rows.append(rr)

    return MDTable([t["name"], t["telephone"], t["address"], t["map"]], rows)

def parse_help_item_list(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        rr[2] = link_or_str(rr[2], f"{t['source']}/{t['map']}")
        rr[3] = phone_or_str(rr[3])

        rows.append(rr)

    return MDTable([t["city"], t["location"], t["website"], t["telephone"], t["details"]], rows)

def parse_stemcell(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        rr[2] = link_or_str(rr[2], t["map"])
        rr[3] = phone_or_str(rr[3])

        rows.append(rr)

    return MDTable([t["region"], t["city"], f"{t['address']}/{t['map']}", t["telephone"]], rows)

def parse_beneficial_articles(data, t):
    rows = []

    for r in data["articles"]:
        rr = process_rows(r)

        domain = urlparse(rr[2]).netloc
        rr[2] = link_or_str(rr[2], domain)

        rows.append(rr)

    return MDTable([t["data.important_articles.article_title"], t["data.important_articles.article_author"], t["website"], t["details"]], rows)

def parse_evacuation_points(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows_list(r)

        if rr[3] != "-":
            rr[3] = link_or_str(rr[3], t["button.google_maps"])

        rows.append(rr)

    return MDTable([t["city"], t["district"], "Yer (Place)", t["map"], t["address"], t["telephone"], t["source"]], rows)

def parse_healthcare_services(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[2] != "-":
            rr[2] = link_or_str(rr[2], t["button.google_maps"])

        if rr[3] != "-":
            rr[3] = link_or_str(rr[3], t['source'])

        if rr[4] != "-":
            rr[4] = phone_or_str(rr[4])

        rows.append(rr)

    return MDTable([t["district"], t["location"], t["map"], t["source"], t["telephone"], t["last_update"], "Güncelleme Saati (Update Time)"], rows)

def parse_digital_platforms(data, t):
    rows = []

    for r in data["usefulLinks"]:
        rr = process_rows(r)

        domain = urlparse(rr[1]).netloc
        rr[1] = link_or_str(rr[1], domain)

        rows.append(rr)

    return MDTable([t["name"], t["website"]], rows)

def parse_transportations(data, t):
    rows = []

    for r in data["transportations"]:
        rr = process_rows(r)

        domain = urlparse(rr[1]).netloc
        rr[1] = link_or_str(rr[1], domain)

        rows.append(rr)

    return MDTable([t["name"], t["website"], t['source'], t['data.transportation.validationDate'], t['details'], t['data.transportation.validityDate']], rows)

def parse_gas_stations(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows(r)

        if rr[2] != "-":
            rr[2] = phone_or_str(rr[2])

        if rr[3] != "-":
            rr[3] = link_or_str(rr[3], t["button.google_maps"])

        rows.append(rr)

    return MDTable([t["name"], t["address"], t["telephone"], t["map"]], rows)

def parse_local_pharmacy_list(data, t):
    rows = []

    for r in data["items"]:
        rr = process_rows_raw_list(r)

        rr[2] = ", ".join(list(map(phone_or_str, rr[2])))
        rr[3] = link_or_str(rr[3], t["button.google_maps"])

        rows.append(rr)

    return MDTable([t["name"], t["address"], t["telephone"], t["map"], t['details']], rows)

data_type_parsers = {
    "city-accommodation": parse_city_accom,
    "new-gathering-list": parse_gathering,
    "food-items": parse_food,
    "container-pharmacy": parse_pharmacy,
    "phone-number-list": parse_phones,
    "useful-links": parse_links,
    "data-vet": parse_vets,
    "help-item-list": parse_help_item_list,
    "stem-cell-donation": parse_stemcell,
    "beneficial-articles": parse_beneficial_articles,
    "evacuation-points": parse_evacuation_points,
    "healthcare-services": parse_healthcare_services,
    "digital-platforms": parse_digital_platforms,
    "transportations": parse_transportations,
    "gas_stations": parse_gas_stations,
    "local-pharmacy-list": parse_local_pharmacy_list,
}

