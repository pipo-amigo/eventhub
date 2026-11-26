import { Compte } from '../modeles/utilisateur';

// Comptes de démonstration (authentification simulée côté client, aucune sécurité réelle)
export const COMPTES: Compte[] = [
  { email: 'etudiant@iset.tn', motDePasse: 'etudiant123', nom: 'Étudiant Démo', role: 'etudiant' },
  { email: 'club@iset.tn', motDePasse: 'club123', nom: 'Club Informatique', role: 'organisateur' },
];
