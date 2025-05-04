from datetime import datetime 
from pydantic import BaseModel
from typing import Optional


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
