import { useState } from "react";
import { registerWithEmail, loginWithGoogle } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      navigate("/login");
    } catch (err) {
      alert("Registration Failed: " + err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      navigate("/login");
    } catch (err) {
      alert("Google Sign-In Failed: " + err.message);
    }
  };

  return (
    <div className="fancy-body">
      <div className="glow-container">
        <form onSubmit={handleRegister} className="fancy-glass-form">
          <h2>🚀 Create Account</h2>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="glow-btn">Register</button>

          <div className="divider">or</div>

          <button type="button" onClick={handleGoogleRegister} className="google-btn">
            <span>🌐</span> Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}
