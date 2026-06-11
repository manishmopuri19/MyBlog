import { createContext,useContext,useState } from "react";

const AuthContext=createContext()

export function AuthProvider({children}){
    const [user,setUser]=useState(null);

    const [token,setToken]=useState(localStorage.getItem("token"));

    const login=(tokenData)=>{
        localStorage.setItem("token",tokenData.access_token);
        setToken(tokenData.access_token);
    }

    const logout=()=>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
        value={{token,user,login,logout,isAuthenticated:!!token}}>{children}</AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}
