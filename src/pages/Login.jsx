import { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      alert("Google Login Failed: " + err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to continue</p>

        <input
          type="email"
          placeholder="Email"
          required
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        <div className="or-divider">or</div>

        <button type="button" onClick={handleGoogle} className="google-btn">
         <span>🌐</span>
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
