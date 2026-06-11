import Home from "./pages/landingPage/Home";
import {Route,Routes} from "react-router-dom"
import Login from "./pages/authPages/login";
import Register from "./pages/authPages/register"
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
    </Routes>
  );

}

export default App;