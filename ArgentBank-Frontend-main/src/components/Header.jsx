import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice.jsx";
import  Logo  from "../assets/images/argentBankLogo.webp"
import "../SASS/header.css"


export function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="head">
        <Link to="/">
          <img src={Logo} alt="Logo de l'entreprise" />
        </Link>
        <div className="login">
          <i className="fa-solid fa-circle-user"></i>
          {user && user.firstName ? (
            <>
              <span>{user.firstName}</span>
              <Link to ="/login">
                <button onClick={handleLogout}>Déconnexion</button>
              </Link>
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