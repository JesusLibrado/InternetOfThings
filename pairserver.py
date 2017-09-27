import zmq
import random
import sys
import time

port = "8128"
context = zmq.Context()
socket = context.socket(zmq.PAIR)
socket.bind("tcp://35.185.213.109:%s" % port)

while True:
    socket.send("Server message to client 3")
    msg = socket.recv()
    print msg
    time.sleep(1)