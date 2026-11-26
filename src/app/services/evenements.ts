import { Injectable, signal } from '@angular/core';
import { EVENEMENTS } from '../donnees/evenements';
import { Evenement } from '../modeles/evenement';

// Ce que le formulaire de création fournit : le service complète id et placesReservees
export type DonneesEvenement = Omit<Evenement, 'id' | 'placesReservees'>;

@Injectable({ providedIn: 'root' })
export class Evenements {
  // Liste privée, exposée en lecture seule
  private _liste = signal<Evenement[]>(EVENEMENTS);
  readonly liste = this._liste.asReadonly();

  trouver(id: number): Evenement | undefined {
    return this._liste().find((e) => e.id === id);
  }

  placesRestantes(e: Evenement): number {
    return e.capacite - e.placesReservees;
  }

  estTermine(e: Evenement): boolean {
    return e.date.getTime() < Date.now();
  }

  // Crée l'événement et renvoie son identifiant
  ajouter(donnees: DonneesEvenement): number {
    const id = Math.max(0, ...this._liste().map((e) => e.id)) + 1;
    this._liste.update((l) => [...l, { ...donnees, id, placesReservees: 0 }]);
    return id;
  }

  // nb > 0 : réserver des places ; nb < 0 : libérer des places
  modifierPlaces(id: number, nb: number) {
    this._liste.update((l) =>
      l.map((e) => (e.id === id ? { ...e, placesReservees: e.placesReservees + nb } : e)),
    );
  }
}
