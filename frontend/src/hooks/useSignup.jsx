import React,{useContext,useState} from 'react'
import axios from 'axios'
import {AuthContext } from '../contexts/AuthContext'
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_AUTH_CONTEXT;

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {currentUser,setCurrentUser} = useContext(AuthContext)
    
    const signup =  async ({name, username, password, confirmPassword, gender}) =>{
        setLoading(true)
        try{
            const response = await axios.request({
                url: url + '/signup',
                method: 'post',
                data: JSON.stringify({name,username, password, confirmPassword, gender}),
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
    return {loading, signup}
}

export default useSignup