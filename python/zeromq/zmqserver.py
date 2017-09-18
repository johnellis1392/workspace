import time
import zmq
from flask import Flask
from flask import request


HOST = '127.0.0.1'
PORT = '4444'

context = zmq.Context()
publisher = context.socket(zmq.PUB)
url = 'tcp://{}:{}'.format(HOST, PORT)

def publish_message(message):

    try:
        publisher.bind(url)
        time.sleep(1)
        publisher.send(message)

    except Exception as err:
        print("error {}".format(err))

    finally:
        publisher.unbind(url)


app = Flask(__name__)

@app.route('/downcase/', methods=['GET'])
def lowerString():

    strn = request.args.get('param')
    response = 'lower case of {} is {}'.format(strn, strn.lower())
    publish_message(response)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
