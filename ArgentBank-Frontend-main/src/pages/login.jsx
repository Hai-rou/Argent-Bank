import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice.jsx";
import "../SASS/login.css"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Tentative login avec :", { email, password, rememberMe });

      const res = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      const token = res.data.body.token;

      // Redux
      dispatch(login({token}));

      // Stockage
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("email");
        localStorage.removeItem("rememberMe");
      }

      navigate("/profile");
    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <main className="login-page">
      <div className="Log-content">
        <div className="headLog">
          <i className="fa-solid fa-circle-user"></i>
          <h1>Se connecter</h1>
        </div>
        <form onSubmit={handleLogin}>
          <label>Nom d'utilisateur</label>
          <input
          className="item"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe</label>
          <input
          className="item"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {" "}Se souvenir de moi
          </label>

          {error && <p className="error">{error}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
