import { NavLink } from "react-router-dom";

import "./NavBar.css"
import { useAuth } from "../../context/AuthContext";
function NavBar(){

    const {isAuthenticated, logout}=useAuth();
    const links=[
        {
            name:"Thoughts",
            id:"thoughts"
        },
        {
            name:"Tech",
            id:"tech"
        },
       
        {
            name:"Research",
            id:"research"
        }, {
            name:"Philosophy",
            id:"philosophy"
        }
    ];

    const scrollToSection=(id)=>{
        const element=document.getElementById(id);
        element?.scrollIntoView({behavior:"smooth"});
    }
    return (

        <nav className="navbar">
            <div className="logo">
                MA<span className="G">G</span>
            </div>

            <div className="nav-links">

                {
                    links.map((item)=>(
                        <NavLink
                        key={item.name}
                        className="nav-btn"
                        onClick={()=>scrollToSection(item.id)}
                        >
                            {item.name}
                    </NavLink>
                    ))
                }
            </div>

           {isAuthenticated ? (
                <div className="auth-links">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="auth-links">
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink className="register-btn" to="/register">Register</NavLink>
                </div>
            )}

        </nav>
    )
}

export default NavBar;