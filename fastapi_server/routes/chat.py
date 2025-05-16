from math import erf
from typing import Any
from fastapi import APIRouter , WebSocket
from datetime import datetime
from uuid import uuid4 
from NOSQL.database import chat_collection
from NOSQL.models import ChatModel
from SQL.sql_models import User
import json



router = APIRouter()




def get_chat_query(sender_id , receiver_id):
    return {
        "$or": [
            {"sender_id": sender_id, "receiver_id": receiver_id},
            {"sender_id": receiver_id, "receiver_id": sender_id},
        ]
    }


@router.get("/user/{user_id}")
async def get_chat_list(user_id: int):
    user_map = []
    you_user = None
    try:
        users = await User.all()
        for u in users:
            data = {
                "name": "You" if u.user_id == user_id else u.name,
                "user_id": u.user_id,
                "last_message": await get_last_message(user_id, u.user_id)
            }
            if u.user_id == user_id:
                you_user = data   
            else:
                user_map.append(data)
        if you_user:
            user_map.insert(0, you_user)  
    except Exception as e:
        print(e)

    return user_map


async def get_last_message(sender_id: str, receiver_id: str):
    chat_query = {
        "$or": [
            {"sender_id": sender_id, "receiver_id": receiver_id},
            {"sender_id": receiver_id, "receiver_id": sender_id},
        ]
    }

    # Project only the last message from the array
    chat_doc = await chat_collection.find_one(chat_query, {"messages": {"$slice": -1}})

    if not chat_doc or "messages" not in chat_doc or not chat_doc["messages"]:
        return  "start the conversation"

    # Convert datetime to string for JSON serialization
    last_message = chat_doc["messages"][0] 

    return last_message['message']

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

    chat_query = get_chat_query(sender_id , receiver_id)
    chat_doc = await chat_collection.find_one(chat_query)
    
    if chat_doc:
        await chat_collection.update_one(
            chat_query,
            {"$push": {"messages": message_doc}}
        )
    else:
        chat_doc = { 
            "sender_id": sender_id,
            "receiver_id": receiver_id,
            "messages": [message_doc]
        }
        await chat_collection.insert_one(chat_doc)

    # Trigger WebSocket event to receiver
    await manager.send_message(receiver_id, message_doc)

    return {"status": "Message sent", "data": message_doc }


@router.get("/messages")
async def get_chat_messages(sender_id: int, receiver_id: int):

    chat_query = get_chat_query(sender_id , receiver_id)
    chat_doc = await chat_collection.find_one(chat_query)

    if not chat_doc:
        return {"status": "No conversation found", "messages": []}

    return {"messages": chat_doc.get("messages", [])}

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            # await self.active_connections[user_id].close()
            del self.active_connections[user_id]

    async def send_message(self, recipient_id: int, message: dict[str,  Any]):
        print("active connection" , self.active_connections)
        if recipient_id in self.active_connections:
            await self.active_connections[recipient_id].send_text(json.dumps(message ,default=str))

manager = ConnectionManager()
     
@router.websocket("/{user_id}")
async def websocket_chat(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print("socket data " , data)
            # Parse data (e.g., recipient_id, message)
            # recipient_id = " "  # Extract from data
            await websocket.send_text(f"Echo: {data}")
    except:
        print("closed ws")
        await manager.disconnect(user_id)