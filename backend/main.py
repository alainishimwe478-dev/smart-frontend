from fastapi import FastAPI, WebSocket
from alerts import manager

app = FastAPI()

@app.websocket("/ws/alerts")
