import { useState,useEffect } from "react";
import { getPosts } from "../services/postService";

export function usePosts(){
    const [posts,setPost]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchPosts=async()=>{
            try{
                const data=await getPosts();
                setPost(data);
            }
            finally{
                setLoading(false);
            }
        }
        fetchPosts();
    },[]);

    return {posts,loading};
}