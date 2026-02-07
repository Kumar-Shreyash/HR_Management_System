from configs.dbConfig import connect_to_db, close_db_connection, get_db 
from fastapi import FastAPI
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup code
    await connect_to_db()
    yield
    # shutdown code
    await close_db_connection()

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def home():
    db = get_db()
    collection_names = await db.list_collection_names()
    return {"collections": collection_names}
