import { useEffect, useState } from "react";
import "../SASS/user.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../Redux/authSlice";
import React from "react";


const User = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState({ firstName: "", lastName: "" });
  const token = useSelector((state) => state.auth.user?.token);
  const dispatch = useDispatch();
  const [activeAccount , setActiveAccount] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)

  const accounts = [
    { id: 'checking', title: 'Vérification de la Banque Argent (x8349)', balance: 'Solde disponible' },
    { id: 'savings', title: 'Caisse d\'épargne Argent Bank (x6712)', balance: 'Solde disponible' },
    { id: 'credit', title: 'Carte de crédit Argent Bank (x8349)', balance: 'Solde actuel' }
  ];

  const transactions = [
    { date: '01/07/2025', description: 'Transaction exemple 1', amount: '+8€', solde: '+100€'},
    { date: '02/07/2025', description: 'Transaction exemple 2', amount: '+8€', solde: '+100€' }
  ]
  const toggleDetails = (idx) => {
    setExpandedRow(prev => (prev === idx ? null : idx))
  }

  useEffect(() => {
      // console.log("Token récupéré :", token);
      // console.log("Token récupéré depuis Redux :", token);


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
          dispatch(setProfile(res.data.body)); // ✅ met à jour Redux avec le profil
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération du profil :", err);
        });
    }, [token, dispatch]);

      const handleEditClick = () => {
    setIsEditing(true);
    setNewName({ firstName: user.firstName, lastName: user.lastName });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName: newName.firstName, lastName: newName.lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Données envoyées PUT :", { firstName: newName.firstName, lastName: newName.lastName });

      // Re-fetch profil à jour
      const profileRes = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Nouveau profil reçu :", profileRes.data.body);

      setUser(profileRes.data.body);
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
    <main className="user-page">
      <h1>
        {isEditing
          ? "Edit user info"
          : <>Bienvenue à nouveau <br />{user.firstName} {user.lastName} !</>
        }
      </h1>        

      {isEditing ? (

        <form onSubmit={handleSave}>
          <label>User name</label>
          <input
            type="text"
            value={`${newName.firstName} ${newName.lastName}`.trim()}
            onChange={(e) => {
              // Split sur espace
              const [first, ...last] = e.target.value.split(" ");
              setNewName({
                firstName: first || "",
                lastName: last.join(" ") || ""
              });
            }}
            required
          />

          <label>First Name</label>
          <input
            type="text"
            value={newName.firstName}
            onChange={(e) => setNewName({ ...newName, firstName: e.target.value })}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            value={newName.lastName}
            onChange={(e) => setNewName({ ...newName, lastName: e.target.value })}
            required
          />

          <button type="submit">Sauvegarder</button>
          <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
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
                  <p>{acc.balance}</p>
                </div>

                {activeAccount === acc.id ? (
                  <button onClick={() => setActiveAccount(null)}>Retour</button>
                ) : (
                  <button onClick={() => setActiveAccount(acc.id)}>Afficher les transactions</button>
                )}
              </div>

              {activeAccount === acc.id && (
                <div className="table">
                  <table>
                    <thead>
                      <tr className="description">
                        <th>Date</th>
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Solde</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, rowIdx) => (
                        <React.Fragment key={rowIdx}>
                          <tr>
                            <td>{t.date}</td>
                            <td>{t.description}</td>
                            <td>{t.amount}</td>
                            <td>{t.solde}</td>
                            <td>
                              <button onClick={() => toggleDetails(rowIdx)}>
                                {expandedRow === rowIdx ? '▼' : '▶'}
                              </button>
                            </td>
                          </tr>
                          {expandedRow === rowIdx && (
                            <tr>
                              <td colSpan="4">
                                <div className="details">
                                  Détails supplémentaires pour {t.description}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        ))}

      </section>
    </main>
  );
};

export default User;
