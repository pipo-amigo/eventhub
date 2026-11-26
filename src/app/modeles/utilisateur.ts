export interface Utilisateur {
  email: string;
  nom: string;
  role: 'etudiant' | 'organisateur';
}

// Compte de démonstration : un utilisateur + son mot de passe (authentification simulée)
export interface Compte extends Utilisateur {
  motDePasse: string;
}
