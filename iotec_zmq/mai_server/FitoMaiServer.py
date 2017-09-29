import signal
import zmq
import six
import base64
import requests
import json
from time import sleep

import zmq
import base64
from pymongo import MongoClient
import gridfs

import datetime

if __name__ == '__main__':

 ctx = zmq.Context()
 socket = ctx.socket(zmq.REP)
 socket.bind("tcp://*:8128")
 print(" ")
 print("-------------- SERVER READY -------------") 

while True:

    message = socket.recv()

    if message.startswith('{'):

        myparams = json.loads(message)

        pars = {
            "device_id": myparams['code_device'],
            #"id_planta": myparams['id_planta'],
            "fecha": myparams['fecha'],
            "values": json.dumps(myparams['values']),  # users=[{"email_hash": "fh7834uifre8houi3f"}, ... ]
            "urlImageLat": myparams['urlImageLat'],
            "urlImageSup": myparams['urlImageSup']
        }
     #r = requests.get("http://fitotron-api.appspot.com/sendSensado", params= pars)
     #data = r.text

        print("Guardando...")

        client = MongoClient("mongodb://35.185.213.109:27017")
        db = client['iotec-jesuslibrado']

        result = db.logs.insert_one({
                    "device_id": pars['device_id'], 
                    "date": pars['fecha'], 
                    "info": pars['values'],
                    "imageUrl": pars['urlImageSup']})

        print pars
        re = "Insertion"
 
        socket.send(re)
     
        image_name = pars['device_id']+'.jpg'
        img_result = open('../../nodejs_frontend/src/images/'+image_name, 'w')
        img_result.write(img_recv)

    else:
        img_recv = (message)
        print("Image Received")

     #client = storage.Client()
     #bucket = client.get_bucket('fitotron-api.appspot.com')
     #print  "--- bucket name ---"
     #print bucket

        today = '%s' % datetime.datetime.now()
        today = today.replace(' ', '_')
        today = today.replace(':', '_')
        today = today.replace('.', '_')
     #print today

     #blob = bucket.get_blob('imagen.jpg')
     #urlblob = "mr3_%s.jpg" % today
     #blob = bucket.blob(urlblob)
     #print blob
     #blob.upload_from_filename('./imagen.jpg')
     #url = blob.public_url
     #print('Blob '+ url)

     # Get the feed

        re = "SUCCESS"
        socket.send(re)
