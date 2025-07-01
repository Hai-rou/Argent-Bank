import { useSelector } from "react-redux";
import { useEffect } from "react";

/**
 * Composant de support : écoute les changements d'auth Redux
 * et loggue dans la console. Aucun affichage visuel.
 */
const SupportLog = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.firstName) {
      console.log("[SupportLog] User connecté :", user);
      console.log("[SupportLog] Token :", user.token);
    } else {
      //console.log("[SupportLog] Aucun utilisateur connecté");
    }
  }, [user]);

  return null; // rien n'est affiché à l'écran
};

export default SupportLog;
