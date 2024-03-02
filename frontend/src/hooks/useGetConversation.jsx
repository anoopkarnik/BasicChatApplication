import axios from 'axios';
import { useContext, useState } from 'react';
import { SelectedUserContext } from '../contexts/selectedUserContext';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_MESSAGE_CONTEXT;

export const useGetConversation = () =>{

    const {selectedUser,setSelectedUser,conversations,setConversations}= useContext(SelectedUserContext)
    
    const [loading,setLoading] = useState(false)
    const getConversation = async ({userId}) => {
        try {
            setLoading(true);
            const response = await axios.request({
                url: url + 'get/'+userId,
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
                    "Content-Type": "application/json"
                }
            })
            const conversation = response.data;
            setConversations(conversation);
        }catch(e){
            toast.error('Not able to get conversation')
        }finally{
            setLoading(false);
        }
    }

    return {loading, getConversation}


}