from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import notes

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Dark Notes API")

# CORS settings
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include notes router
app.include_router(notes.router)
