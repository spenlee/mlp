import configparser
import boto.sqs
from boto.sqs.message import RawMessage
import json
from pprint import pprint
import os


def enqueueNotification(phoneNumber, name, messageType = 'text'):
    config = configparser.RawConfigParser()
    config.read(os.path.join(os.getcwd() + '/django_drf_starter_project/scripts/','settings.cfg'))
    region = config.get('AWS', 'region')
    queueName = config.get('AWS', 'queue')
    accessKey = config.get('AWS', 'accessKey')
    secretKey = config.get('AWS', 'secretKey')
    pprint(accessKey)
    pprint(secretKey)

    conn = boto.sqs.connect_to_region(region,aws_access_key_id=accessKey,aws_secret_access_key=secretKey) ##change before final
    q = conn.create_queue(queueName) #10-second message visibility

    if len(phoneNumber) > 10:
        phoneNumberNoCountryCode = phoneNumber[1:]
    else:
        phoneNumberNoCountryCode = phoneNumber
    data = {
        'phoneNumber': str(phoneNumberNoCountryCode),
        'name': str(name),
        'type': str(messageType)
    }

    m = RawMessage()
    m.set_body(json.dumps(data))
    q.write(m)