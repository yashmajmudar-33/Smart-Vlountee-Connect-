from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from database import engine, Base
from database import get_db
import models
from pathlib import Path

# Get the directory where this script is located
BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="Smart Volunteer Connect API",
    description="Backend API for Smart Volunteer Connect system",
    version="1.0.0"
)

# CORS Configuration - Allow frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:8000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "null"  # For file:// protocol during development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Mount static files (serve index.html, style.css, app.js)
app.mount("/static", StaticFiles(directory=str(BASE_DIR)), name="static")


class VolunteerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    age: int
    occupation: str
    city: str
    organization: str | None = None
    availability: str | None = None
    interests: list[str] = []


class NGOCreate(BaseModel):
    organization_name: str
    registration_number: str
    organization_type: str
    focus_area: str
    contact_person: str
    city: str
    email: EmailStr
    phone: str
    about: str | None = None


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


@app.get("/")
def home():
    return {
        "message": "Smart Volunteer Backend Connected to PostgreSQL"
    }


@app.post("/api/volunteers")
def create_volunteer(payload: VolunteerCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Volunteer).filter(models.Volunteer.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Volunteer already registered with this email")

    volunteer = models.Volunteer(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        age=payload.age,
        occupation=payload.occupation,
        city=payload.city,
        organization=payload.organization,
        availability=payload.availability,
        interests=", ".join(payload.interests),
    )
    db.add(volunteer)
    db.commit()
    db.refresh(volunteer)
    return {"message": "Volunteer registered successfully", "id": volunteer.id}


@app.post("/api/ngos")
def create_ngo(payload: NGOCreate, db: Session = Depends(get_db)):
    existing = db.query(models.NGO).filter(
        models.NGO.registration_number == payload.registration_number
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="NGO already registered with this registration number")

    ngo = models.NGO(**payload.model_dump())
    db.add(ngo)
    db.commit()
    db.refresh(ngo)
    return {"message": "NGO registered successfully", "id": ngo.id}


@app.post("/api/contact")
def create_contact_message(payload: ContactCreate, db: Session = Depends(get_db)):
    contact = models.ContactMessage(**payload.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return {"message": "Message sent successfully", "id": contact.id}


@app.get("/api/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    return {
        "volunteers": db.query(models.Volunteer).count(),
        "ngos": db.query(models.NGO).count(),
        "messages": db.query(models.ContactMessage).count(),
    }


@app.get("/api/volunteers")
def get_all_volunteers(db: Session = Depends(get_db)):
    """Get all registered volunteers"""
    volunteers = db.query(models.Volunteer).all()
    return [
        {
            "id": v.id,
            "name": v.name,
            "email": v.email,
            "city": v.city,
            "interests": v.interests
        }
        for v in volunteers
    ]


@app.get("/api/ngos")
def get_all_ngos(db: Session = Depends(get_db)):
    """Get all registered NGOs"""
    ngos = db.query(models.NGO).all()
    return [
        {
            "id": n.id,
            "organization_name": n.organization_name,
            "focus_area": n.focus_area,
            "city": n.city,
            "email": n.email
        }
        for n in ngos
    ]
