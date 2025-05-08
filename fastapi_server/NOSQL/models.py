from datetime import datetime 
from pydantic import BaseModel
from typing import Optional , List
from uuid import UUID


class NotificationModel(BaseModel):
    recipient_id: int
    sender_id: int
    type: str
    reference_id: int
    message: str
    is_read: bool = False
    sender_name: Optional[str] = None
    sender_email: Optional[str] = None
    created_at: datetime = datetime.utcnow()

class Message(BaseModel):
    chat_id: UUID  # Unique identifier for the message
    message: str   
    is_read: bool = False   
    created_at: datetime   
    post_id: Optional[int] = None   

class ChatModel(BaseModel):
    sender_id: int  # ID of the sender (references USERS.user_id)
    receiver_id: int  # ID of the receiver (references USERS.user_id)
    messages: str  # Array of messages in the conversation

    class Config:
        # Allow arbitrary types (e.g., UUID, datetime) for MongoDB serialization
        arbitrary_types_allowed = True
        # Convert UUID and datetime to strings for JSON serialization
        json_encoders = {
            UUID: str,
            datetime: lambda dt: dt.isoformat()
        }