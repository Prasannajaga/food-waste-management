from pydantic import BaseModel 
from typing import Optional


class CreateNotificationSchema(BaseModel):
    recipient_id: int
    sender_id: int
    type: str
    reference_id: int
    message: str
    sender_name: Optional[str] = None
    sender_email: Optional[str] = None

class NotificationResponseSchema(CreateNotificationSchema):
    is_read: bool
    created_at: str
