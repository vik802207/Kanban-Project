import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {user && <Navbar />}
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
