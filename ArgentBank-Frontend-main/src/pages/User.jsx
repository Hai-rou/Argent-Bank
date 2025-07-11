import { useEffect, useState } from "react";
import "../SASS/pages/user.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Redux/userSlice.jsx";
import React from "react";


const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeAccount , setActiveAccount] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const [newName, setNewName] = useState({
    userName: "",
    firstName: "",
    lastName: ""
  });


  const accounts = [
    { id: 'checking', title: 'Vérification de la Banque Argent (x8349)', amount: '2 082.79 $', balance: 'Solde disponible' },
    { id: 'savings', title: 'Caisse d\'épargne Argent Bank (x6712)', amount: '10 928,42 $', balance: 'Solde disponible' }, 
    { id: 'credit', title: 'Carte de crédit Argent Bank (x8349)', amount: '184,30 $', balance: 'Solde disponible' }
  ];

  const transactions = [
    { date: '01/07/2025', description: 'Golden Sun Bakery', amount: '+8€', solde: '+100€'},
    { date: '02/07/2025', description: 'Transaction exemple 2', amount: '+8€', solde: '+100€' }
  ]
  const toggleDetails = (idx) => {
    setExpandedRow(prev => (prev === idx ? null : idx))
  }

  useEffect(() => {
    if (!token) {
      console.warn("Pas de token, on ne fait pas la requête");
      return;
    }

    axios.get("http://localhost:3001/api/v1/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("Réponse reçue :", res);
      dispatch(setProfile(res.data.body));
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération du profil :", err);
    });
  }, [token, dispatch]);


      const handleEditClick = () => {
        if (!user) return; // Sécurité
        setIsEditing(true);
        setNewName({
          userName: user.userName || "",
          firstName: user.firstName || "",
          lastName: user.lastName || ""
        });
      };


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { 
          userName: newName.userName 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Données envoyées PUT :", { userName: newName.userName });

      // Re-fetch profil à jour
      const profileRes = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Nouveau profil reçu :", profileRes.data.body);

      dispatch(setProfile(profileRes.data.body));
      setIsEditing(false);

    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil :", err);
    }
  };


  if (!user) {
    return <p>Chargement des infos utilisateur...</p>;
  }

  return (
    <div className="user-page">
      <h1>
        {isEditing
          ? "Edit user info"
          : <>Bienvenue à nouveau <br />{user.firstName} {user.lastName} !</>
        }
      </h1>        

      {isEditing ? (

        <form onSubmit={handleSave}>
          <div className="formInp">
              <label>User name: <input
              type="text"
              value={newName.userName}
              onChange={(e) => setNewName({...newName, userName: e.target.value})}
              required
            /></label>
            

            <label>First Name: <input
              type="text"
              value={newName.firstName}
              disabled
            /></label>
            

            <label>Last Name: <input
              type="text"
              value={newName.lastName}
              disabled
            /></label>
            
          </div>
          <div className="btn">
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
          

        </form>

      ) : (
        <button onClick={handleEditClick}>Modifier le nom</button>
      )}
      <section className="account">

        {accounts.map((acc, idx) => (
          (!activeAccount || activeAccount === acc.id) && (
            <div key={acc.id} className="main-item">
              <div className="Item">
                <div className="sub-item">
                  <h3>{acc.title}</h3>
                  <p className="amount">{acc.amount}</p>
                  <p>{acc.balance}</p>
                </div>

                {activeAccount === acc.id ? (
                  <button onClick={() => setActiveAccount(null)}>Retour</button>
                ) : (
                  <button onClick={() => setActiveAccount(acc.id)}>Afficher les transactions</button>
                )}
              </div>

              {activeAccount === acc.id && (
                <div className="transaction-grid">
                  <div className="grid-label">
                    <span className="label">Date :</span>
                    <span className="label">Description :</span>
                    <span className="label">Montant :</span>
                    <span className="label">Solde :</span> 
                  </div>
                  {transactions.map((t, rowIdx) => (
                    <div key={rowIdx} className="transaction-card">
                      <div className="grid-row">
                        <span className="value">{t.date}</span>
                        <span className="value">{t.description}</span>
                        <span className="value">{t.amount}</span>
                        <span className="value">{t.solde}</span>
                        <div className="grid-row-full">
                        <button onClick={() => toggleDetails(rowIdx)}>
                          <i className={`fa-solid ${expandedRow === rowIdx ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        </button>
                      </div>
                      </div>

                      

                      {expandedRow === rowIdx && (
                        <div className="transaction-details">
                          <div className="detail-label">
                            <span>Type de transaction</span>
                            <span>Catégorie</span>
                            <span>Note</span>
                          </div>
                          <div className="detail-info">
                            <span>Electonic</span>
                            <span>Food <i className="fa-solid fa-pencil"></i></span>
                            <span>Lorem ipsum <i className="fa-solid fa-pencil"></i></span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}


            </div>
          )
        ))}

      </section>
    </div>
  );
};

export default User;
