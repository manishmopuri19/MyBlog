import api from "../api/axios";


export const getPosts= async()=>{
    const response=await api.get("/posts");

    return response.data;
}

export const getPost=async(slug)=>{
    const response=await api.get(`/posts/${slug}`);

    return response.data;
}

export const getFeaturedPost=async()=>{
    const response=await api.get("/posts/featured");
    return response.data;
}