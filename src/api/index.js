import axios from "axios";

const API = axios.create({ baseURL: "https://fitdeck.herokuapp.com"})

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem("profile").token)
    }
    return req;
});

export const fetchPosts = () => API.get("/posts");

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);