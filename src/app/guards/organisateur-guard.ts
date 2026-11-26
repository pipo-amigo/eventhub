import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session } from '../services/session';

export const organisateurGuard: CanActivateFn = (route, state) => {
  const session = inject(Session);
  const router = inject(Router);
  if (session.estOrganisateur()) {
    return true;
  }
  // Visiteur : connexion d'abord ; étudiant : retour à la liste
  if (!session.connecte()) {
    return router.createUrlTree(['/connexion'], { queryParams: { retour: state.url } });
  }
  return router.createUrlTree(['/evenements']);
};
