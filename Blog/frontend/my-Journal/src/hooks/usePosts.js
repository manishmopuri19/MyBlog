import { useState,useEffect } from "react";
import { getPosts } from "../services/postService";

export function usePosts(){
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchPosts=async()=>{
            try{
                const data=await getPosts();
                setPosts(data);
            }
            finally{
                setLoading(false);
            }
        }
        fetchPosts();
    },[]);

    return {posts,loading};
}