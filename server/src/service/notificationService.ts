import axios from "axios";


const Notification_URL = "http://localhost:3001/notifications/notify"; 

export const createNotification = async (payload : any) =>{

    if(payload.recipient_id === payload.sender_id){
      return;
    } 
  
    axios.post(Notification_URL, payload)
    .then((response:any) => {
      console.log('Notification sent:', response.data);
    })
    .catch((error : any)=> {
      console.error('Error sending notification:', error.message);
    });
  }