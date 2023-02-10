from core import MDTable

def parse_city_accom(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))
        
        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        if rr[2] != "-":
            rr[2] = "Doğrulanmış" if rr[2] == "True" else "Doğrulanmamış"
        
        if rr[3] != "-":
            rr[3] = f"[Kaynak]({rr[3]})"
        
        if rr[4] != "-":
            rr[4] = f"[Google Maps]({rr[4]})"

        rows.append(rr)

    return MDTable(["Şehir", "Yer", "Doğrulanma Durumu", "Kaynak", "Adres", "Doğrulanma Tarihi"], rows)

def parse_gathering(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        if rr[1] != "-":
            rr[1] = f"[Google Maps]({rr[1]})"

        if rr[2] != "-":
            rr[2] = f"[Kaynak]({rr[1]})"

        rows.append(rr)

    return MDTable(["Yer", "Harita", "Kaynak"], rows)

def parse_food(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        if rr[1] != "-":
            rr[1] = f"[Google Maps]({rr[1]})"
        
        if rr[2] != "-":
            rr[2] = f"[Kaynak]({rr[2]})"

        rows.append(rr)

    return MDTable(["Yer", "Adres", "Kaynak", "Telefon", "Güncelleme Tarihi", "Güncelleme Saati"], rows)

def parse_pharmacy(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        if rr[3] != "-":
            rr[3] = f"[Google Maps]({rr[3]})"

        rows.append(rr)

    return MDTable(["İl", "İlçe", "Adres", "Harita"], rows)

def parse_phones(data):
    rows = []

    for r in data["phones"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                raise ValueError("None value in phone number list")

        rows.append(rr)

    return MDTable(["İsim", "Numara"], rows)

def parse_links(data):
    rows = []

    for r in data["usefulLinks"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                raise ValueError("None value in useful links list")

        rr[1] = f"[{rr[1]}]({rr[1]})"

        rows.append(rr)

    return MDTable(["İsim", "URL"], rows)

def parse_vets(data):
    rows = []

    for r in data["vets"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        rr[3] = f"[Google Maps]({rr[3]})"

        rows.append(rr)

    return MDTable(["Veteriner", "Telefon", "Adres", "Harita"], rows)

def parse_help_item_list(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        rr[2] = f"[Kaynak/Harita]({rr[2]})"

        rows.append(rr)

    return MDTable(["İl", "Lokasyon", "Link", "Telefon", "Notlar"], rows)

def parse_stemcell(data):
    rows = []

    for r in data["items"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        rr[2] = f"[Harita]({rr[2]})"

        rows.append(rr)

    return MDTable(["Bölge", "İl", "Adres/Harita", "Telefon"], rows)

def parse_beneficial_articles(data):
    rows = []

    for r in data["articles"]:
        rr = list(map(str, r.values()))

        for i in range(len(rr)):
            if rr[i] == "None" or rr[i] is None:
                rr[i] = "-"

        rr[2] = f"[Link]({rr[2]})"

        rows.append(rr)

    return MDTable(["Başlık", "Yazar", "Link", "Konu"], rows)

data_type_parsers = {
    "city-accommodation": parse_city_accom,
    "new-gathering-list": parse_gathering,
    "food-items": parse_food,
    "container-pharmacy": parse_pharmacy,
    "phone-number-list": parse_phones,
    "useful-links": parse_links,
    "data-vet": parse_vets,
    "help-item-list": parse_help_item_list,
    # "blood-donationlist": lambda _: 
    "stem-cell-donation": parse_stemcell,
    "beneficial-articles": parse_beneficial_articles,
}

