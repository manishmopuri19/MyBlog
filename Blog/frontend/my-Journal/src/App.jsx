import { Route, Routes } from "react-router-dom";
import Login from "./pages/authPages/login";
import Register from "./pages/authPages/register";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/Home/Home.jsx";
import ReaderHome from "./pages/ReaderHome/ReaderHome.jsx";
import BlogDetails from "./pages/BlogDetail/BlogDetail.jsx";
import AdminWrite from "./pages/AdminWrite/AdminWrite.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reader" element={<ReaderHome />} />
      <Route path="/posts/:slug" element={<BlogDetails />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminWrite />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
