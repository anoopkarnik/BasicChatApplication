import axios from 'axios';

const url = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT ;

export const getUsers = async ({filter}) =>{
    const response = await axios.request({
        url: url + 'users?filter='+filter,
        method: 'get',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
    return response.data;
}