import axios from "axios";

export const  baseHttp = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
}); 

export const  notificationHttp = axios.create({
  baseURL: "http://localhost:3001/notifications/",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
}); 

export const  chatHttp = axios.create({
  baseURL: "http://localhost:3001/chat/",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
}); 