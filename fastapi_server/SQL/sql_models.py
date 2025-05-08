from tortoise.models import Model
from tortoise import fields

class User(Model):
    class Meta:
        table = "users"

    user_id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=255, unique=True)

