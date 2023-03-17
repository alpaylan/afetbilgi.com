import datetime
from flask import jsonify
import jwt
from Server import app
import boto3

dynamodb = boto3.resource('dynamodb', region_name=app.config['AWS_REGION'], 
                          aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'], 
                          aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY'])
table = dynamodb.Table('users')

class UserUtils:
    # TODO: Add encryption to passwords
    @staticmethod
    def login(username, password):
        response = table.get_item(Key={'username': username})
        if 'Item' in response:
            item = response['Item']
            if item['password'] == password:
                return jsonify({'status': 'success', 'token': UserUtils.generate_token(username)})
        return jsonify({'status': 'failure'})
    
    @staticmethod
    def register(username, password):
        response = table.get_item(Key={'username': username})
        if 'Item' in response:
            return jsonify({'status': 'failure', 'message': 'Username already exists.'})
        else:
            table.put_item(Item={'username': username, 'password': password})
            return jsonify({'status': 'success'})
        
    @staticmethod
    def generate_token(username, expiration=3600):
        payload = {
            'exp': datetime.utcnow() + datetime.timedelta(seconds=expiration),
            'iat': datetime.utcnow(),
            'sub': username
        }
        return jwt.encode(payload, app.config['JWT_SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod   
    def validate_token(token):
        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            exp_time = datetime.utcfromtimestamp(payload['exp'])
            if exp_time < datetime.utcnow():
                # Token has expired
                return False, 'Token has expired.'
            else:
                # Token is valid
                return True, ''
        except jwt.ExpiredSignatureError:
            # Token has expired
            return False, 'Token has expired.'
        except jwt.InvalidTokenError:
            # Token is invalid
            return False, 'Invalid token.'