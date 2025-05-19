import axios from "axios";
import { PORT } from "../app";


const EUREKA_URL = 'http://localhost:8761/eureka';
const APP_NAME = 'EXPRESS-SERVICE';
let INSTANCE_ID = `localhost:${APP_NAME}:${PORT}`;



export async function registerWithEureka(PORT : number) {
  try {
    INSTANCE_ID = `localhost:${APP_NAME}:${PORT}`;
    
    const instance = {
        instance: {
            instanceId : INSTANCE_ID,
            hostName: 'localhost',
            app: APP_NAME,
            ipAddr: '127.0.0.1',
            status: 'UP',
            port: { $: PORT, '@enabled': true },
            vipAddress: APP_NAME,
            dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
            }
        }
    };

    await axios.post(`${EUREKA_URL}/apps/${APP_NAME}`, instance, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Registered with Eureka');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to register with Eureka:', err.message);
    }  
  }
} 

// Deregister from Eureka
async function deregisterFromEureka() {
  try {
    await axios.delete(`${EUREKA_URL}/apps/${APP_NAME}/${INSTANCE_ID}`);
    console.log('🧹 Deregistered from Eureka');
  } catch (err) {
        if (err instanceof Error) console.error('⚠️ Failed to deregister from Eureka:', err.message);
  }
}


export async function sendHeartbeat() {
  try {
    await axios.put(`${EUREKA_URL}/apps/${APP_NAME}/${INSTANCE_ID}`);
    console.log('Sent heartbeat');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to send heartbeat:', err.message);
    }
  }
}
 


async function shutdown() {
  console.log('Received shutdown signal');
  await deregisterFromEureka();
  console.log('Server shutting down');
  process.exit(0);
};

process.on('SIGINT', shutdown);  
process.on('SIGTERM', shutdown); 