import axios from "axios";
import Cookies from "js-cookie";

export const Post = async (url: string, data: any, header?: any) => {
    return await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${url}`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                ...header
            }
        }
    )
}

export const Get = async (url: string, header?: any) => {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`,
        {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                ...header
            }
        }
    )
}

export const Put = async (url: string, data: any, header?: any) => {
    return await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}${url}`,
        data,
        {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                ...header
            }
        }
    )
}

export const Delete = async (url: string, header?: any) => {
    return await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}${url}`,
        {
            headers: {
                "Authorization": `Bearer ${Cookies.get("token")}`,
                ...header
            }
        }
    )
}