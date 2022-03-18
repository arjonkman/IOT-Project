from flask import Flask


app = Flask(__name__)

@app.route('/api/v1', methods=['GET'])
def api():
    return ''


if __name__ == '__main__':
    app.run(debug=True)