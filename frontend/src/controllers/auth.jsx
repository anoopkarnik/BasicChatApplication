import axios from 'axios';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT + import.meta.env.VITE_AUTH_CONTEXT;

export const signup = async({name, username, password, confirmPassword, gender})=>{
    const response = await axios.request({
        url: url + '/signup',
        method: 'post',
        data: JSON.stringify({name,username, password, confirmPassword, gender}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}

export const signin = async({username, password})=>{
    console.log(username, password)
    const response = await axios.request({
        url: url + '/signin',
        method: 'post',
        data: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data;
}

export const logout = async()=>{
    const response = await axios.request({
        url: url + '/logout',
        method: 'get' ,      
        headers: { 
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    })
    return response.data;
}