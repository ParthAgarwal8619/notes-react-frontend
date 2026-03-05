from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import SessionLocal

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET all notes
@router.get("/")
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()


# GET single note
@router.get("/{note_id}")
def get_note(note_id: int, db: Session = Depends(get_db)):

    note = db.query(models.Note).filter(models.Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    return note


# CREATE note
@router.post("/")
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):

    db_note = models.Note(
        title=note.title,
        content=note.content
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note


# UPDATE note
@router.put("/{note_id}")
def update_note(note_id: int, note: schemas.NoteCreate, db: Session = Depends(get_db)):

    db_note = db.query(models.Note).filter(models.Note.id == note_id).first()

    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")

    db_note.title = note.title
    db_note.content = note.content

    db.commit()
    db.refresh(db_note)

    return db_note


# DELETE note
@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):

    note = db.query(models.Note).filter(models.Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()

    return {"message": "Note deleted"}