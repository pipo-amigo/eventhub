import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evenements } from '../../services/evenements';
import { Reservations } from '../../services/reservations';
import { BadgeCategorie } from '../../composants/badge-categorie/badge-categorie';
import { EtatPlacesPipe } from '../../pipes/etat-places';

@Component({
  imports: [DatePipe, RouterLink, BadgeCategorie, EtatPlacesPipe],
  selector: 'app-detail',
  styleUrl: './detail.css',
  templateUrl: './detail.html',
})
export class Detail {
  private evenements = inject(Evenements);
  reservations = inject(Reservations);

  // Reçoit le :id de l'URL grâce à withComponentInputBinding() (c'est une chaîne)
  id = input.required<string>();

  evenement = computed(() => this.evenements.trouver(Number(this.id())));

  restantes = computed(() => {
    const e = this.evenement();
    return e ? this.evenements.placesRestantes(e) : 0;
  });

  termine = computed(() => {
    const e = this.evenement();
    return e ? this.evenements.estTermine(e) : false;
  });

  // Pourcentage de remplissage pour la barre (places réservées / capacité)
  remplissage = computed(() => {
    const e = this.evenement();
    return e ? Math.round((e.placesReservees / e.capacite) * 100) : 0;
  });
}
