from fastapi import APIRouter , WebSocket
from datetime import datetime
from uuid import uuid4 
from NOSQL.database import chat_collection
from NOSQL.models import ChatModel


router = APIRouter()

@router.post("/create")
async def send_chat_message(data: ChatModel):
    print("data coming",data.dict())
    sender_id = data.sender_id
    receiver_id = data.receiver_id

    # Create message document
    message_doc = {
        "chat_id": str(uuid4()),
        "owner_id" : sender_id,
        "message": data.messages,
        "is_read": False,
        "created_at": datetime.utcnow(), 
    }

    # Find or create chat document
    chat_query = {"sender_id": sender_id, "receiver_id": receiver_id}
    chat_doc = await chat_collection.find_one(chat_query)
    
    if chat_doc:
        # Append message to existing conversation
        await chat_collection.update_one(
            chat_query,
            {"$push": {"messages": message_doc}}
        )
    else:
        # Create new conversation
        chat_doc = {
            "sender_id": sender_id,
            "receiver_id": receiver_id,
            "messages": [message_doc]
        }
        await chat_collection.insert_one(chat_doc)

    # Trigger WebSocket event to receiver
    await manager.send_message(receiver_id, data.messages)

    return {"status": "Message sent", "chat_id": message_doc["chat_id"]}

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].close()
            del self.active_connections[user_id]

    async def send_message(self, recipient_id: int, message: str):
        print("active connection" , self.active_connections)
        if recipient_id in self.active_connections:
            await self.active_connections[recipient_id].send_text(message)

manager = ConnectionManager()
     
@router.websocket("/{user_id}")
async def websocket_chat(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print("socket data " , data)
            # Parse data (e.g., recipient_id, message)
            recipient_id = " "  # Extract from data
            await manager.send_message(recipient_id, "hello")
            # Store in CHATS table (PostgreSQL)
    except:
        print("closed ws")
        await manager.disconnect(user_id)