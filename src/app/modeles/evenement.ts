export type Categorie = 'atelier' | 'conference' | 'competition' | 'sortie';

export interface Evenement {
  id: number;
  titre: string;
  description: string;
  categorie: Categorie;
  club: string; // ex. 'Club Robotique'
  date: Date; // date et heure de début
  lieu: string;
  capacite: number; // nombre total de places
  placesReservees: number;
  gratuit: boolean;
}
