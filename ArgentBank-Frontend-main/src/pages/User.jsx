import { useEffect, useState } from "react";
import "../SASS/user.css"
import axios from "axios";
import { useSelector } from "react-redux";

const User = () => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.user.token)


  useEffect(() => {
      console.log("Token récupéré :", token);
      console.log("Token récupéré depuis Redux :", token);


      if (!token) {
        console.warn("Aucun token trouvé !");
        return;
      }

        axios.get("http://localhost:3001/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((res) => {
          console.log("Réponse reçue :", res);
          setUser(res.data.body);
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du profil :", err);
        });
    }, []);


  if (!user) {
    return <p>Chargement des infos utilisateur...</p>;
  }

  return (
    <main className="user-page">
      <h1>Bienvenue à nouveau <br/> {user.firstName} {user.lastName} !</h1>
      <button>Modifier le nom</button>
      <section className="account">
        <div className="Item">
          <div className="sub-item">
            <h3>Vérification de la Banque Argent (x8349)</h3>
            <p>Solde disponible</p>
          </div>
          <button>Afficher la transactions</button>
        </div>
        <div className="Item">
          <div className="sub-item">
            <h3>Caisse d'épargne Argent Bank (x6712)</h3>
            <p>Solde disponible</p>
          </div>
          <button>Afficher la transactions</button>
        </div>  
        <div className="Item">
          <div className="sub-item">
            <h3>Carte de crédit Argent Bank (x8349)</h3>
            <p>Solde actuel</p>
          </div>
          <button>Afficher la transactions</button>
        </div>
          
      </section>
    </main>
  );
};

export default User;
