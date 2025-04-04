FROM python:3.9

# Create app directory
COPY . .

RUN pip install paho-mqtt
RUN pip install requests
RUN pip install python-dotenv

CMD ["python3", "./listener_mqtt.py"]