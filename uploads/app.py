from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/tweets', methods=['POST'])
def index():
    if request.method=='POST':
        form=request.json
        tweet_reply=form['tweet_reply']
        if tweet_reply:
            form['result']="Empathetic"
        else:
            form['result']="Not Empathetic"
    return form

if __name__ == "__main__":
    from waitress import serve
    serve(app, debug=DEBUG,host="127.0.0.1", port=5000)