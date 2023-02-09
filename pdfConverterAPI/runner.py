import os
from PyPDF2 import PdfMerger

os.system("cd leafGenerator && yarn install && node index.js")

folders = os.listdir("outputs")

def generateParentPDF(folder):
    merger = PdfMerger()
    files = os.listdir("outputs/"+folder)
    files = list(filter(lambda x: x.endswith(".pdf"), files))
    for file in files:
        merger.append(open("outputs/"+folder+"/"+file, 'rb'))
    with open("outputs/"+folder+".pdf", 'wb') as fout:
        merger.write(fout)

folders = list(filter(lambda x: not x.endswith(".pdf"), folders))
for folder in folders:
    merger = PdfMerger()
    for leaf in os.listdir("outputs/"+folder):
        merger.append(open("outputs/"+folder+"/"+leaf, 'rb'))
    with open("outputs/"+folder+".pdf", 'wb') as fout:
        merger.write(fout)
