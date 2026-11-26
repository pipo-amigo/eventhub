import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evenements } from '../../services/evenements';
import { Reservations } from '../../services/reservations';
import { Session } from '../../services/session';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-mes-reservations',
  styleUrl: './mes-reservations.css',
  templateUrl: './mes-reservations.html',
})
export class MesReservations {
  session = inject(Session);
  reservations = inject(Reservations);
  private evenements = inject(Evenements);

  // Chaque réservation de l'utilisateur, complétée par son événement
  details = computed(() =>
    this.reservations
      .mesReservations()
      .map((r) => ({ ...r, evenement: this.evenements.trouver(r.evenementId) })),
  );
}
