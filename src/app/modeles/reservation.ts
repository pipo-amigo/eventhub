export interface Reservation {
  id: number;
  evenementId: number;
  email: string; // utilisateur connecté
  nbPlaces: number; // 1 à 4
  telephone: string;
  dateReservation: Date;
}
