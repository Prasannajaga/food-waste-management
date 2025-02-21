import axios from "axios";

export const  baseHttp = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
}); 