import { useContext, useState } from "react";
import { SelectedUserContext } from "../contexts/selectedUserContext";
import axios from 'axios';
import toast from "react-hot-toast";

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_MESSAGE_CONTEXT;

export const useSendMessage = () =>{

    const {selectedUser,setSelectedUser,conversations,setConversations}= useContext(SelectedUserContext)

    const sendMessage = async({message}) =>{
        try{
            const response = await axios.request({
                url: url + 'send/'+selectedUser._id,
                method: 'post',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({message})
            })
            console.log(response)
            const pushedMessage = response.data;
            setConversations([...conversations,pushedMessage.newMessage]);
        }catch(e){
            toast.error('Not able to send message')
        }
    }
    return {sendMessage}
}
