from database import notification_collection
from models import NotificationModel
from bson.objectid import ObjectId
from schemas import CreateNotificationSchema


async def create_notification(data: CreateNotificationSchema):
    notification = NotificationModel(**data.dict())
    result = await notification_collection.insert_one(notification.dict())
    return str(result.inserted_id)

async def get_user_notifications(user_id: int , types: str = None):
    query = {"recipient_id": user_id}
    if types:  
        query["type"] = types.upper()

    notifications = await notification_collection.find(query).to_list(100)
    print("not" , notifications)
    for n in notifications:
        n["id"] = str(n["_id"])
        del n["_id"]
    return notifications

async def mark_as_read(notification_id: str):
    result = await notification_collection.update_one(
        {"_id": ObjectId(notification_id)},
        {"$set": {"is_read": True}}
    )
    return result.modified_count > 0
