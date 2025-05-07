from fastapi import FastAPI , WebSocket
from routes.notifications import router as notifications_router  
from routes.chat import router as chat_router  
import logging
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise 


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.include_router(notifications_router, prefix="/notifications")
app.include_router(chat_router, prefix="/chat")
 

register_tortoise(
    app,
    db_url="postgres://postgres:Prasa123@localhost:5500/db_fwd",
    modules={"models": ["SQL.sql_models"]},
    generate_schemas=False,  
)

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Authorization, Content-Type, etc.
) 
 

