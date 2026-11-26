import { Injectable, computed, inject, signal } from '@angular/core';
import { Reservation } from '../modeles/reservation';
import { Evenements } from './evenements';
import { Session } from './session';

@Injectable({ providedIn: 'root' })
export class Reservations {
  private session = inject(Session);
  private evenements = inject(Evenements);

  // Toutes les réservations (tous utilisateurs confondus), privées
  private _liste = signal<Reservation[]>([]);

  // Uniquement les réservations de l'utilisateur connecté
  readonly mesReservations = computed(() =>
    this._liste().filter((r) => r.email === this.session.utilisateur()?.email),
  );
  readonly nombre = computed(() => this.mesReservations().length);

  estInscrit(evenementId: number): boolean {
    return this.mesReservations().some((r) => r.evenementId === evenementId);
  }

  reserver(evenementId: number, nbPlaces: number, telephone: string) {
    const email = this.session.utilisateur()?.email;
    if (!email) {
      return;
    }
    const reservation: Reservation = {
      id: Date.now(),
      evenementId,
      email,
      nbPlaces,
      telephone,
      dateReservation: new Date(),
    };
    this._liste.update((l) => [...l, reservation]);
    this.evenements.modifierPlaces(evenementId, nbPlaces);
  }

  annuler(id: number) {
    const reservation = this._liste().find((r) => r.id === id);
    if (!reservation) {
      return;
    }
    this._liste.update((l) => l.filter((r) => r.id !== id));
    // On libère les places dans l'événement
    this.evenements.modifierPlaces(reservation.evenementId, -reservation.nbPlaces);
  }
}
