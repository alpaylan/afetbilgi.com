import os
import sys
import json

def main():
    if len(sys.argv) != 4 or sys.argv[1] not in ["generate", "validate"]:
        print(f"Usages: \n\tpython3 {sys.argv[0]} generate <data-json> <out-file>\n\tpython3 {sys.argv[0]} validate <schema-file> <data-json>")
        sys.exit(1)

    if sys.argv[1] == "generate":
        generate_schema(sys.argv[2], sys.argv[3])
    else:
        validate(sys.argv[2], sys.argv[3])

def generate_schema(data_json, out_file):
    with open(data_json, "r") as f:
        data = json.load(f)
    schema = {}

    for opt in data["options"]:
        key = opt["name_tr"]
        s = get_schema(opt["value"])
        
        if s is None:
            print(f"Error: Root option {key} has an unsupported type")
            sys.exit(1)

        schema[key] = s

    with open(out_file, "w") as f:
        json.dump(schema, f, indent=4, ensure_ascii=False)

def get_schema(data):
    if isinstance(data, str):
        return "string"
    elif isinstance(data, int) or isinstance(data, float):
        return "number"
    elif isinstance(data, bool):
        return "bool"
    elif isinstance(data, list):
        it = None

        for item in data:
            it = get_schema(item)
            if it is not None:
                break

        if it is None:
            print(f"Error: No array item has a supported type")
            return None

        return {"type": "array", "items": it}
    elif isinstance(data, dict):
        props = {}
        for k, v in data.items():
            it = get_schema(v)
            if it is not None:
                props[k] = it
        return {"type": "object", "properties": props}

    return None

def validate(schema_file, data_json):
    with open(schema_file, "r") as f:
        schema = json.load(f)
    with open(data_json, "r") as f:
        data = json.load(f)

    for opt in data["options"]:
        key = opt["name_tr"]
        if key not in schema:
            print(f"Error: Root option {key} is not in the schema")
            print_error_message()
            sys.exit(1)

        if not validate_item(opt["value"], schema[key]):
            print(f"Error: Root option {key} has an invalid value")
            print_error_message()
            sys.exit(1)

def validate_item(data, schema):
    if data == None:
        return True
    if isinstance(schema, str):
        if schema == "string":
            if not isinstance(data, str):
                print(f"Error: {data} is not a string")
                return False
            return True
        elif schema == "number":
            if not isinstance(data, int) or isinstance(data, float):
                print(f"Error: {data} is not a number")
                return False
            return True
        elif schema == "bool":
            if not isinstance(data, bool):
                print(f"Error: {data} is not a bool")
                return False
            return True
    elif isinstance(schema, dict):
        if schema["type"] == "array":
            if not isinstance(data, list):
                print(f"Error: {data} is not an array")
                return False

            for item in data:
                if not validate_item(item, schema["items"]):
                    return False

            return True
        elif schema["type"] == "object":
            if not isinstance(data, dict):
                print(f"Error: {data} is not an object")
                return False

            for k, v in data.items():
                if k not in schema["properties"]:
                    continue

                if not validate_item(v, schema["properties"][k]):
                    print(f"Error: {v} did not validate with schema {k}: {schema['properties'][k]}")
                    return False

            return True

    print(f"Error: {schema} is not a valid schema")
    return False

def print_error_message():
    print("\n" + "=" * 50)
    print("DATA INTEGRITY VALIDATION FAILED")
    print("=" * 50 + "\n")

if __name__ == "__main__":
    main()

