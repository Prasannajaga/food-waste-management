from fastapi import FastAPI , Request
from routes.notifications import router as notifications_router  
import logging
from tortoise.contrib.fastapi import register_tortoise


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.include_router(notifications_router, prefix="/notifications")
 

register_tortoise(
    app,
    db_url="postgres://postgres:Prasa123@localhost:5500/db_fwd",
    modules={"models": ["sql_models"]},
    generate_schemas=False,  
)