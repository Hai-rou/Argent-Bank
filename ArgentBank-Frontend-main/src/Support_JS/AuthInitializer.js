import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../Redux/userSlice.jsx"
import { login } from "../Redux/authSlice.jsx"
import axios from "axios";


const AuthInitializer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token")
        if (storedToken) {
            
            dispatch(login(storedToken))

            // Appelle l'API pour récupérer le profil
            axios.get("http://localhost:3001/api/v1/user/profile", {
            headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(res => {
            dispatch(setProfile(res.data.body));
            })
            .catch(err => {
            console.error("[AuthInitializer] Erreur chargement profil", err);
            });
            } else {
                console.log("[AuthInitializer] Aucun token trouvé");
            }

    }, [dispatch])

    return null; // Rien à afficher
}

export default AuthInitializer;