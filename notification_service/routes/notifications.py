from fastapi import APIRouter, HTTPException
from service.crud import create_notification, get_user_notifications, mark_as_read
from schemas import CreateNotificationSchema
from sql_models import User

router = APIRouter()

async def user_exists(user_id: int) -> bool:
    return await User.exists(user_id=user_id)

@router.post("/notify")
async def notify(data: CreateNotificationSchema):
    sender_id = data.sender_id
    recipient_id = data.recipient_id 

    try:
        sender = await User.get(user_id=sender_id)
        data.sender_name = sender.name
        data.sender_email = sender.email
        recipient = await User.get(user_id=recipient_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Sender or recipient does not exist")
    
    print("Final Notification:", data.dict())
    notif_id = await create_notification(data)
    return {"status": "created", "id": notif_id}

@router.get("/check")
def checkhealth():
    return "health is good"

@router.get("/user/{user_id}")
async def get_notifications(user_id: int , types: str = None):
    return await get_user_notifications(user_id , types)

@router.post("/read/{notif_id}")
async def read_notification(notif_id: str):
    success = await mark_as_read(notif_id)
    if not success:
        raise HTTPException(status_code=404, detail="Notification not found")
    return {"status": "marked as read"}
