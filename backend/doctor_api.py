from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from models import User

router = APIRouter()

# Mock data for demonstration
mock_patients = [
    {"id": 1, "full_name": "Patient One", "email": "patient1@example.com"},
    {"id": 2, "full_name": "Patient Two", "email": "patient2@example.com"},
]

mock_vitals = [
    {"id": 1, "patient_id": 1, "heart_rate": 70, "oxygen": 98},
]

mock_prescriptions = [
    {"id": 1, "patient_id": 1, "medicine": "Albuterol", "dose": "2 puffs", "frequency": "as needed"},
]

mock_alerts = [
    {"id": 1, "patient_id": 1, "type": "warning", "message": "High inhaler usage"},
]

mock_messages = [
    {"id": 1, "patient_id": 1, "sender": "doctor", "text": "Please monitor symptoms"},
]

mock_appointments = [
    {"id": 1, "patient_id": 1, "date": "2023-10-01", "reason": "Checkup"},
]

mock_logs = [
    {"id": 1, "patient_id": 1, "symptoms": "Cough", "triggers": "Dust", "medication_taken": "Yes"},
]

mock_notes = [
    {"id": 1, "patient_id": 1, "note": "Patient reports improved breathing"},
]

mock_reports = [
    {"id": 1, "patient_id": 1, "report": "Monthly summary"},
]

@router.get("/patients")
def get_patients():
    return mock_patients
