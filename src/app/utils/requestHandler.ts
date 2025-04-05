import axios from "axios"

interface IRequest{
    method: "POST" | "GET" | "PUT" | "DELETE",
    url : string,
    body?: object
}

const DEPLOY = true
let BASE_URL

if(DEPLOY){
    BASE_URL = "http://localhost:3000/api"
}else{
    BASE_URL = "http://192.168.18.6:3000/api"
}


const API = axios.create({
    baseURL : BASE_URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

export async function requestHandler(request: IRequest){
    return await API({
        url: request.url,
        method: request.method,
        data: request.body
    })
}