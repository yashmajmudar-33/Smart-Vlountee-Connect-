from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="volunteer")
    city = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class Volunteer(Base):
    __tablename__ = "volunteers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    occupation = Column(String, nullable=False)
    city = Column(String, nullable=False)
    organization = Column(String)
    availability = Column(String)
    interests = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class NGO(Base):
    __tablename__ = "ngos"

    id = Column(Integer, primary_key=True, index=True)
    organization_name = Column(String, nullable=False)
    registration_number = Column(String, unique=True, index=True, nullable=False)
    organization_type = Column(String, nullable=False)
    focus_area = Column(String, nullable=False)
    contact_person = Column(String, nullable=False)
    city = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    about = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
