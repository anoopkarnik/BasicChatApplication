import axios from 'axios';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_MESSAGE_CONTEXT;

export const sendMessage = async ({id,message}) =>{
    const response = await axios.request({
        url: url + 'send/'+id,
        method: 'post',
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        data: JSON.stringify({message:message})
    })
    return response.data;
}

export const getConversations = async ({userId}) =>{
    const response = await axios.request({
        url: url + 'get/'+userId,
        method: 'get',
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    })
    return response.data;
}