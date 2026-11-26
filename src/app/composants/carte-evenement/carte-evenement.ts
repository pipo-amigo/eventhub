import { Component, computed, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evenement } from '../../modeles/evenement';
import { Evenements } from '../../services/evenements';
import { BadgeCategorie } from '../badge-categorie/badge-categorie';
import { EtatPlacesPipe } from '../../pipes/etat-places';

@Component({
  imports: [DatePipe, RouterLink, BadgeCategorie, EtatPlacesPipe],
  selector: 'app-carte-evenement',
  styleUrl: './carte-evenement.css',
  templateUrl: './carte-evenement.html',
})
export class CarteEvenement {
  private evenements = inject(Evenements);

  evenement = input.required<Evenement>(); // entrée : l'événement à afficher
  favori = output<number>(); // sortie : envoie l'id de l'événement au parent

  termine = computed(() => this.evenements.estTermine(this.evenement()));
  restantes = computed(() => this.evenements.placesRestantes(this.evenement()));

  ajouterAuxFavoris(event: MouseEvent) {
    // Empêche le clic d'atteindre la carte (qui ouvrirait le détail)
    event.stopPropagation();
    this.favori.emit(this.evenement().id);
  }
}
