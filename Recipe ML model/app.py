from flask import Flask,request
import os
from trans_model import generation_function
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
CORS(app)
# Configure FLASK_DEBUG from environment variable
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG')
#python -m flask --app main run --debug --host 0.0.0.0
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

#post route    
@app.route("/recommend",methods=['POST'])
def test():
    content=request.json
    data=content['ingredients']
    generated = generation_function(data)
    return generated

if __name__=='__main__':
    app.run()