import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../SASS/login.css"

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      const token = res.data.body.token;

      // Stocker le token
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/profile");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <main className="login-page">
        <section className="Log-content">
            <i className="fa-solid fa-circle-user"></i>
            <h1>Se connecter</h1>
            <form onSubmit={handleLogin}>
                <div>
                <label>Nom d'utilisateur</label>
                <input
                    className="item"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div>
                <label>Mot de passe</label>
                <input
                    className="item"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div>
                <label>
                    <input
                    className="check"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Se souvenir de moi
                </label>
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Se connecter</button>
            </form>
        </section>
    </main>
  );
};

export default Login;
