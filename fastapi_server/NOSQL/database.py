from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.notification_db
notification_collection = db.get_collection("notifications")
chat_collection = db.get_collection("chat")