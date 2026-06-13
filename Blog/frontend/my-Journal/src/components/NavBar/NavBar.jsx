import { NavLink, useNavigate  } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const navigate=useNavigate()

  const links = [
    { name: "Technology", id: "technology" },
    { name: "Philosophy", id: "philosophy" },
    { name: "Research",   id: "research"   },
    { name: "Personal",   id: "personal"   },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={()=>{
        navigate("/reader")
      }}>
        MA<span className="G">G</span>
      </div>

      <div className="nav-links">
        {links.map((item) => (
          <NavLink
            key={item.name}
            className="nav-btn"
            onClick={() => scrollToSection(item.id)}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="auth-links">
        {isAuthenticated ? (
          <>
            {user?.role === "ADMIN" && (
              <NavLink to="/admin" className="admin-nav-link">Write</NavLink>
            )}
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink className="register-btn" to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
