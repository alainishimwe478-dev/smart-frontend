mofrom fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db, Base, engine
from models import User
import hashlib
import openai
import os

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/users/signup")
async def signup(full_name: str, email: str, password: str, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hashlib.sha256(password.encode()).hexdigest()
    new_user = User(full_name=full_name, email=email, password_hash=hashed, role="user")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"token": "demo-token", "role": "user"}

@app.post("/chat")
async def chat(message: dict):
    user_message = message.get("message", "")
    if not user_message:
        return {"sender": "doctor", "text": "Please provide a message."}

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful doctor assistant specializing in asthma management. Provide concise, empathetic, and medically accurate advice."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=150,
            temperature=0.7
        )
        reply = response.choices[0].message.content.strip()
        return {"sender": "doctor", "text": reply}
    except Exception as e:
        return {"sender": "doctor", "text": "I'm sorry, I'm having trouble connecting right now. Please try again later."}

@app.websocket("/ws/alerts")
from models import User
import hashlib

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users/signup")
async def signup(full_name: str, email: str, password: str, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hashlib.sha256(password.encode()).hexdigest()
    new_user = User(full_name=full_name, email=email, password_hash=hashed, role="user")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"token": "demo-token", "role": "user"}

@app.websocket("/ws/alerts")
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
