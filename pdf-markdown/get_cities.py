import sys

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python3 {sys.argv[0]} <markdown file>")
        sys.exit(1)
    
    with open(sys.argv[1], "r") as f:
        lines = f.readlines()

    cities = set()

    for line in lines:
        if line.startswith("### "):
            cities.add(line[4:].strip())

    for c in sorted(cities):
        print(c)

if __name__ == "__main__":
    main()