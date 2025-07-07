import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice.jsx";
import  Logo  from "../assets/images/argentBankLogo.webp"
import "../SASS/header.css"


export function Header() {
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <header>
      <div className="head">
        <Link to="/">
          <img src={Logo} alt="Logo de l'entreprise" />
        </Link>
        <div className="login">
          <i className="fa-solid fa-circle-user"></i>
          {token && userName ? (
            <>
              <span>{userName}</span>
                <button onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}