import sys
import json

def main():
    if len(sys.argv) != 3:
        print(f"Usage: python3 {sys.argv[0]} <markdown file> <out file>")
        sys.exit(1)
    
    with open(sys.argv[1], "r") as f:
        lines = f.readlines()

    cities = set()

    for line in lines:
        if line.startswith("### "):
            cities.add(line[4:].strip())

    with open(sys.argv[2], "w") as f:
        json.dump(list(sorted(cities)), f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    main()