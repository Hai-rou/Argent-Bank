import Logo from "../assets/images/argentBankLogo.webp"
import { Link } from "react-router-dom";
import "../SASS/header.css"


export function Header() {
    return (
        <header>
            <div className="head">
                <Link to="/">
                    <img src={Logo} alt="Logo de l'entreprise" />
                </Link>
                <div className="login">
                    <i className="fa-solid fa-circle-user"></i>
                    <Link to="/login">
                        <button>Se connecter</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}