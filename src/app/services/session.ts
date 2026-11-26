import { Injectable, computed, signal } from '@angular/core';
import { COMPTES } from '../donnees/comptes';
import { Utilisateur } from '../modeles/utilisateur';

@Injectable({ providedIn: 'root' })
export class Session {
  // Utilisateur connecté (null = visiteur). Privé : seul le service le modifie.
  private _utilisateur = signal<Utilisateur | null>(null);
  readonly utilisateur = this._utilisateur.asReadonly();

  // Valeurs dérivées
  readonly connecte = computed(() => this._utilisateur() !== null);
  readonly role = computed(() => this._utilisateur()?.role ?? null);
  readonly estOrganisateur = computed(() => this.role() === 'organisateur');

  // Renvoie true si les identifiants sont corrects
  connecter(email: string, motDePasse: string): boolean {
    const compte = COMPTES.find((c) => c.email === email && c.motDePasse === motDePasse);
    if (!compte) {
      return false;
    }
    // On ne garde pas le mot de passe dans la session
    this._utilisateur.set({ email: compte.email, nom: compte.nom, role: compte.role });
    return true;
  }

  deconnecter() {
    this._utilisateur.set(null);
  }
}
