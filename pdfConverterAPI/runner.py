import os
from PyPDF2 import PdfMerger

OUTPUT_ROOT = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), "AfetBilgi")


def generateParentPDF(folder):
    folderName = os.path.basename(folder)
    if not os.path.exists(os.path.join(folder, '../', folderName + ".pdf")):
        files = list(filter(lambda x: x.endswith(
            ".pdf"), os.listdir(folder)))
        merger = PdfMerger()
        for file in files:
            merger.append(open(os.path.join(folder, file), 'rb'))
        with open(os.path.join(folder, '../', folderName + ".pdf"), 'wb') as fout:
            merger.write(fout)


for root, dirs, files in os.walk(OUTPUT_ROOT, topdown=False):
    for name in dirs:
        generateParentPDF(os.path.join(root, name))
generateParentPDF(OUTPUT_ROOT)  # Root doc, exports as outputs.pdf
