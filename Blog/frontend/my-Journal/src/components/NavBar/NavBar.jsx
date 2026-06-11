import { NavLink } from "react-router-dom";

import "./NavBar.css"

function NavBar(){
    const links=[
        {
            name:"Thoughts",
            path:"/thoughts"
        },
        {
            name:"Tech",
            path:"/tech"
        },
        {
            name:"Concepts",
            path:"/concepts"
        },
        {
            name:"Research",
            path:"/research"
        }
    ];

    return (

        <nav className="navbar">
            <div className="logo">
                M
            </div>

            <div className="nav-links">

                {
                    links.map((item)=>(
                        <NavLink
                        key={item.name}
                        to={item.path}
                        >
                            {item.name}
                    </NavLink>
                    ))
                }
            </div>

            <div className="auth-links">

                <NavLink to={"/login"}>Login</NavLink>
                 <NavLink
          className="register-btn"
          to="/register"
        >
          Register
        </NavLink>
            </div>

        </nav>
    )
}

export default NavBar;