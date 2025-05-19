from fastapi import FastAPI , WebSocket
from routes.notifications import router as notifications_router  
from routes.chat import router as chat_router  
import logging
import asyncio
import uvicorn
import httpx
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
 
 
EUREKA_URL = 'http://localhost:8761/eureka'
APP_NAME = 'FASTAPI-SERVICE'
PORT = 3001
INSTANCE_ID = f'localhost:{APP_NAME}:{PORT}'

instance = {
    "instance": {
        "instanceId": INSTANCE_ID,
        "hostName": "localhost",
        "app": APP_NAME,
        "ipAddr": "127.0.0.1",
        "status": "UP",
        "port": {"$": PORT, "@enabled": "true"},
        "vipAddress": APP_NAME,
        "dataCenterInfo": {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            "name": "MyOwn"
        }
    }
}

async def register_with_eureka():
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(f"{EUREKA_URL}/apps/{APP_NAME}", json=instance, headers={"Content-Type": "application/json"})
            print("✅ Registered with Eureka:", res.status_code)
        except Exception as e:
            print("❌ Failed to register with Eureka:", str(e))

async def send_heartbeat():
    async with httpx.AsyncClient() as client:
        while True:
            try:
                res = await client.put(f"{EUREKA_URL}/apps/{APP_NAME}/{INSTANCE_ID}")
                print("💓 Sent heartbeat:", res.status_code)
            except Exception as e:
                print("❌ Failed to send heartbeat:", str(e))
            await asyncio.sleep(30)

@app.on_event("startup")
async def startup_event():
    await register_with_eureka()
    asyncio.create_task(send_heartbeat()) 

async def deregister_from_eureka():
    async with httpx.AsyncClient() as client:
        try:
            url = f"{EUREKA_URL}/apps/{APP_NAME}/{INSTANCE_ID}"
            response = await client.delete(url)
            if response.status_code == 200:
                print("Deregistered from Eureka successfully")
            else:
                print(f"Failed to deregister, status code: {response.status_code}")
        except Exception as e:
            print(f"Error deregistering from Eureka: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    await deregister_from_eureka()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)