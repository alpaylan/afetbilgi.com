from flask import Flask, request, jsonify
from Interface import Interface
from Requests import *
from dotenv import load_dotenv
from panel.be.UserUtils import UserUtils
from os import environ

load_dotenv
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
app.config['AWS_REGION'] = environ.get('AWS_REGION')
app.config['AWS_ACCESS_KEY_ID'] = environ.get('AWS_ACCESS_KEY_ID')
app.config['AWS_SECRET_ACCESS_KEY'] = environ.get('AWS_SECRET_ACCESS_KEY')
interface = Interface()

@app.route('/accounts/login', methods=['POST'])
def login():
    req = request.get_json()
    return UserUtils.login(req['username'], req['password'])

@app.route('/accounts/register', methods=['POST'])
def register():
    req = request.get_json()
    return UserUtils.register(req['username'], req['password'])

@app.route('/new_table_schema', methods=['POST'])
def new_table_schema():
    req = request.get_json()
    if interface.request(NewTableSchemaRequest(req['table_name'], req['columns'])):
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failure'})
    
@app.route('/new_entry', methods=['POST'])
def new_entry():
    req = request.get_json()
    if interface.request(NewEntryRequest(req['table_name'], req['entry'])):
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failure'})
    
@app.route('/update_entry', methods=['POST'])
def update_entry():
    req = request.get_json()
    if interface.request(UpdateEntryRequest(req['table_name'], req['id'], req['entry'])):
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failure'})
    
@app.route('/get_table', methods=['GET'])
def get_table():
    table_name = request.args.get('table_name')
    table = interface.request(GetTableSchemaRequest(table_name))
    return jsonify(table.to_json())

@app.route('/get_table_entries', methods=['GET'])
def get_table_entries():
    table_name = request.args.get('table_name')
    entries = interface.request(GetTableEntriesRequest(table_name))
    return jsonify(entries)

@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    data = interface.request(GetAllDataRequest())
    print(data)
    return jsonify(data)


app.run(host='localhost', port=5000, debug=True)
