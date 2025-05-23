import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css"; // Import the CSS

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to TaskFlow</h1>
      <p className="home-subtitle">Manage your tasks like a pro.</p>

      <div className="button-group">
        <Link to="/login">
          <button className="btn btn-login">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-signup">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
