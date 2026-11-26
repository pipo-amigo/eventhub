import { Routes } from '@angular/router';
import { Liste } from './pages/liste/liste';
import { authGuard } from './guards/auth-guard';
import { organisateurGuard } from './guards/organisateur-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'evenements', pathMatch: 'full' },
  // Seule la liste est chargée directement : toutes les autres pages sont en lazy loading
  { path: 'evenements', component: Liste, title: 'Événements' },
  {
    path: 'evenements/:id',
    loadComponent: () => import('./pages/detail/detail').then((m) => m.Detail),
    title: "Détail de l'événement",
  },
  {
    path: 'evenements/:id/reserver',
    loadComponent: () => import('./pages/reservation/reservation').then((m) => m.Reservation),
    canActivate: [authGuard],
    title: 'Réservation',
  },
  {
    path: 'mes-reservations',
    loadComponent: () =>
      import('./pages/mes-reservations/mes-reservations').then((m) => m.MesReservations),
    canActivate: [authGuard],
    title: 'Mes réservations',
  },
  {
    path: 'organisateur/nouveau',
    loadComponent: () =>
      import('./pages/nouvel-evenement/nouvel-evenement').then((m) => m.NouvelEvenement),
    canActivate: [organisateurGuard],
    title: 'Nouvel événement',
  },
  {
    path: 'connexion',
    loadComponent: () => import('./pages/connexion/connexion').then((m) => m.Connexion),
    title: 'Connexion',
  },
  // Route joker : toujours en dernier
  {
    path: '**',
    loadComponent: () => import('./pages/introuvable/introuvable').then((m) => m.Introuvable),
    title: 'Page introuvable',
  },
];
