import _thread
import asyncio
import os
import tornado.ioloop
import tornado.web
import tornado.websocket
import pika
from threading import Thread
import logging
import json

logging.basicConfig(level=logging.INFO)

# web socket clients connected.
clients = []
rooms = ['0']

connection = pika.BlockingConnection()
logging.info('Connected:localhost')
channel = connection.channel()

class Room:
    def __init__(self):
        self.rooms = []

def available_room(room_id):
    if room_id in rooms:
        return False
    return True

def create_room(room_id):
    rooms.append(room_id)
    start_consumer_room(room_id)

def get_connection():
    credentials = pika.PlainCredentials('guest', 'guest')
    conn = pika.BlockingConnection(pika.ConnectionParameters(host="localhost", port=5672,
                                                             virtual_host="/",
                                                             credentials=credentials))
    return conn

def callback(ch, method, properties, body):
    print(" [x] %s" % (body))
    for client in clients:
        if method.routing_key == client.room:
            client.socket.write_message(body)


def start_consumer_room(room='0'):
    asyncio.set_event_loop(asyncio.new_event_loop())
    channel = get_connection().channel()
    channel.queue_declare(queue=room)
    channel.basic_consume(
        queue=room,
        on_message_callback=callback,
        auto_ack=True)

    channel.start_consuming()

def send_message_to_queue(message_obj):
    connection = pika.BlockingConnection()
    channel = connection.channel()
    channel.queue_declare(queue=message_obj['room'])
    channel.basic_publish(exchange='',
                        routing_key=message_obj['room'],
                        body=message_obj['message'])
    connection.close()


def disconnect_to_rabbitmq():
    channel.stop_consuming()
    connection.close()
    logging.info('Disconnected from Rabbitmq')


class SocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        logging.info('WebSocket opened')
        clients.append(
            {
                'room': '0',
                'socket': self
            }
        )

    def on_message(self, message):
        message_obj = json.loads(message)
        if available_room(message_obj['room']):
            create_room(message_obj['room'])
        send_message_to_queue(message_obj)

    def on_close(self):
        logging.info('WebSocket closed')
        clients.remove(
            {
                'room': '0',
                'socket': self
            }
        )

    def check_origin(self, origin):
        return True

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("websocket.html")


def make_app():
    return tornado.web.Application([
        (r'/ws', SocketHandler),
        (r"/", MainHandler),
    ])


class WebServer(tornado.web.Application):

    def __init__(self):
        handlers = [(r'/ws', SocketHandler),
                    (r"/", MainHandler), ]
        settings = {'debug': True}
        super().__init__(handlers, **settings)

    def run(self, port=8888):
        self.listen(port)
        tornado.ioloop.IOLoop.instance().start()


class TestHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("test success")


ws = WebServer()


def start_server():
    asyncio.set_event_loop(asyncio.new_event_loop())
    logging.info('Starting server')
    ws.run()


if __name__ == "__main__":

    try:
        logging.info('Starting thread Tornado')
        threadC = Thread(target=start_consumer_room)
        threadC.start()

        t = Thread(target=start_server, args=())
        t.daemon = True
        t.start()

        t.join()
        try:
            input("Server ready. Press enter to stop\n")
        except SyntaxError:
            pass
        try:
            logging.info('Disconnecting from RabbitMQ..')
            disconnect_to_rabbitmq()
        except Exception:
            pass
    except Exception as e:
        logging.error(e)
        # stopTornado()

        logging.info('See you...')