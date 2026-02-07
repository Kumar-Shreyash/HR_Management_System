from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI=os.getenv("MONGO_URI")
DB_NAME=os.getenv("DB_NAME")

client=None
db=None

async def connect_to_db():
    global client,db
    try:
        client=AsyncIOMotorClient(MONGO_URI)
        db=client[DB_NAME]

        await client.admin.command("ping")
        print(f"✅ Database connection successful : {os.getenv('DB_NAME')}")
    except Exception as err:
        print(f"❌ Error connecting Database : {err}")
        raise

async def close_db_connection():
    global client
    if client:
        client.close()
        print("✅ Database disconnected")

def get_db():
    return db