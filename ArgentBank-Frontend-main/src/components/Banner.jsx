import  Tree  from "../assets/images/bank-tree.webp"
import "../SASS/banner.css"

function Banner () {
    return (
        <section className="Banner">
            <img src={Tree} alt="Pot rempli de pièces" />
            <div className="Info">
                <div className="message">
                    <p className="subtitle">Aucun frais.</p>
                    <p className="subtitle">Aucun dépôt minimum.</p>
                    <p className="subtitle">Taux d'intérêt élevés.</p>
                    <p>Ouvrez un compte d’épargne avec Argent Bank dès aujourd’hui !</p>
                </div>
            </div>
        </section>
    )
}

export default Banner;