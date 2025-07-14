import  Tree  from "../assets/images/bank-tree.webp"
import "../SASS/components/banner.css"

function Banner () {
    return (
        <section className="Banner" style={{
            backgroundImage: `url(${Tree})`,
            backgroundSize: 'cover',
            backgroundPosition: '0% 33%',
            height: '300px'
            }}>
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