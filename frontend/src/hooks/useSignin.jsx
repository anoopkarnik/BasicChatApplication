import React,{useContext,useState} from 'react'
import axios from 'axios'
import {AuthContext } from '../contexts/AuthContext'
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_AUTH_CONTEXT;

const useSignin = () => {
    const [loading,setLoading] = useState(false);
    const {currentUser,setCurrentUser} = useContext(AuthContext)
    
    const signin =  async (username, password) =>{
        setLoading(true)
        try{
            const response = await axios.request({
                url: url + '/signin',
                method: 'post',
                data: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const user = response.data
            setCurrentUser(user)
            localStorage.setItem('currentUser', JSON.stringify(user))
        }catch(e){
            toast.error('Invalid username or password')
        }finally{
            setLoading(false)
        }
    }
    return {loading, signin}
}

export default useSignin