import axios from "axios";
import Cookies from "js-cookie";

export const Post = async(url: string, data: any, header?: any) => {
    console.log(Cookies.get("token"),"Cookies.get(token)");
    
    return await axios.post(
        `${import.meta.env.VITE_BACKEND_URL,url}`, 
        data,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }
    )
}