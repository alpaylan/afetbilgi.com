def turkish_lowercase(text):
    return text.replace("I","ı").replace("İ","i").lower()

def turkish_uppercase(text):
    return text.replace("i","İ").replace("ı","I").upper()

def turkish_capitalize(text):
    return turkish_uppercase(text[0]) + turkish_lowercase(text[1:])

def turkish_title(text):
    return " ".join([turkish_capitalize(word) for word in text.split()])