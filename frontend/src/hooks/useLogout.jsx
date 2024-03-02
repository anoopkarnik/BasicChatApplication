import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import axios from 'axios'

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_AUTH_CONTEXT;

const useLogout = () => {
    const { currentUser, setCurrentUser} = useContext(AuthContext)
    const [loading,setLoading] = useState(false);
    const logout = async () => {
        try {
            setLoading(true);
            const response = await axios.request({
                url: url + '/logout',
                method: 'get' ,      
                headers: { 
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
                },
            })
            const user =  response.data;
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
        }catch(e){
            toast.error('Not able to logout')
        }finally{
            setLoading(false);
        }
    }
    return {loading, logout}
}

export default useLogout
