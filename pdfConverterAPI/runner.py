import os
from PyPDF2 import PdfMerger

# os.system("cd leafGenerator && yarn install && node index.js")

# folders = os.listdir("outputs")

# def generateParentPDF(folder):
#     merger = PdfMerger()
#     files = os.listdir("outputs/"+folder)
#     files = list(filter(lambda x: x.endswith(".pdf"), files))
#     for file in files:
#         merger.append(open("outputs/"+folder+"/"+file, 'rb'))
#     with open("outputs/"+folder+".pdf", 'wb') as fout:
#         merger.write(fout)

# folders = list(filter(lambda x: not x.endswith(".pdf"), folders))
# for folder in folders:
#     merger = PdfMerger()
#     for leaf in os.listdir("outputs/"+folder):
#         merger.append(open("outputs/"+folder+"/"+leaf, 'rb'))
#     with open("outputs/"+folder+".pdf", 'wb') as fout:
#         merger.write(fout)

OUTPUT_ROOT = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), "outputs")


def generateParentPDF(folder):
    folderName = os.path.basename(folder)
    if not os.path.exists(os.path.join(folder, folderName, ".pdf")):
        files = list(filter(lambda x: x.endswith(
            ".pdf"), os.listdir(folder)))
        subfolders = [f.path + "/" + f.path +
                      ".pdf" for f in os.scandir(folder) if f.is_dir()]
        files += subfolders
        print(files)
        merger = PdfMerger()
        for file in files:
            merger.append(open(os.path.join(folder, file), 'rb'))
        with open(os.path.join(folder, folderName + ".pdf"), 'wb') as fout:
            merger.write(fout)


for root, dirs, files in os.walk(OUTPUT_ROOT, topdown=False):
    # for name in files:
    #     print(os.path.join(root, name))
    for name in dirs:
        generateParentPDF(os.path.join(root, name))
