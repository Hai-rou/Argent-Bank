import  Banner  from "../components/Banner.jsx"
import  Chat  from "../assets/images/icon-chat.webp"
import  Money  from "../assets/images/icon-money.webp"
import  Security  from "../assets/images/icon-security.webp"
import "../SASS/pages/homepage.css"

export function Homepage () {
    return (
        <section className="home">
            <Banner />
            <div className="bodyHome">
                <div className="box">
                    <img src={Chat} alt="icone de discussion" />
                    <h3>Vous êtes notre priorité n°1</h3>
                    <p>Besoin de parler à un représentant ? Contactez-nous via notre chat disponible 24h/24 et 7j/7 ou par téléphone en moins de 5 minutes.</p>
                </div>
                <div className="box">
                    <img src={Money} alt="icone de billet" />
                    <h3>Plus d'économies signifie des taux plus élevés</h3>
                    <p>Plus vous économisez avec nous, plus votre taux d’intérêt sera élevé !</p>
                </div>
                <div className="box">
                    <img src={Security} alt="icone de sécurité" />
                    <h3>Une sécurité à laquelle vous pouvez faire confiance</h3>
                    <p>Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent sont toujours en sécurité.</p>
                </div>
            </div>
        </section>
    )
}