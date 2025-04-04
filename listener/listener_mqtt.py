import paho.mqtt.client as mqtt
import os
import json
import requests
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 

# Función al conectarse
def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Conectado al Broker MQTT con código de resultado: {reason_code}")
    # Aquí debo colocar el canal al que me quiero subscribir
    canal = "stocks/info"
    print(f"-> Me estoy conectando al canal: {canal}")
    client.subscribe(canal)

# Función al recibir un mensaje
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    # procesar mensaje
    mensaje_formateado = procesar_json(msg)
    enviar_a_api(mensaje_formateado)

def procesar_json(msg):
    #print("\n = Procesando mensaje:")
    diccionario = json.loads(msg.payload)
    """ print(diccionario)
    print(f"{diccionario.keys()}") """
    diccionario["price"] = float(diccionario["price"])
    diccionario["quantity"] = int(diccionario["quantity"])
    """ print("\n = Diccionario procesado:")
    print(diccionario) """
    return diccionario;

def enviar_a_api(mensaje):
    #respuesta = requests.post("http://localhost:3000/stocks", json=mensaje)
    print("\n = Enviando a la API:")
    respuesta = requests.post("http://api:3000/stocks", json=mensaje)
    print(respuesta)
    print(respuesta.json)

cliente_mqtt = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
cliente_mqtt.on_connect = on_connect
cliente_mqtt.on_message = on_message

host = os.getenv("HOST")
puerto = int(os.getenv("PORT"))
usuario = os.getenv("USER")
contraseña = os.getenv("PASSWORD")



cliente_mqtt.username_pw_set(usuario, contraseña)
cliente_mqtt.connect(host, puerto, 60)
# Host, puerto, s para reconectar

# Para que quede en loop
cliente_mqtt.loop_forever()



# Parsear

# Enviar a la API
