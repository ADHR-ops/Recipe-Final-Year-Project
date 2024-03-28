from flask import Flask,request
from trans_model import generation_function
app = Flask(__name__)
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
    app.run(host="0.0.0.0",port=5000)