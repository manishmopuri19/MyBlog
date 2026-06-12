import {Route,Routes} from "react-router-dom"
import Login from "./pages/authPages/login";
import Register from "./pages/authPages/register"
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/Home/Home.jsx";
import ReaderHome from "./pages/ReaderHome/ReaderHome.jsx";
function App() {

  return (
    <Routes>
      <Route
      path="/"
      element={<Home />} />

       <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/reader"
        element={<ReaderHome />}
      />
    </Routes>
  );

}

export default App;