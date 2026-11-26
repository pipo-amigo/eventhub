import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../modeles/evenement';

export type CritereTri = 'date-asc' | 'date-desc' | 'places';

// Pipe pur : trie une copie du tableau ([...]) pour ne pas modifier l'original
@Pipe({ name: 'triEvenements' })
export class TriEvenementsPipe implements PipeTransform {
  transform(evenements: Evenement[], critere: CritereTri = 'date-asc'): Evenement[] {
    const copie = [...evenements];
    if (critere === 'places') {
      // Le plus de places restantes en premier
      return copie.sort((a, b) => b.capacite - b.placesReservees - (a.capacite - a.placesReservees));
    }
    copie.sort((a, b) => a.date.getTime() - b.date.getTime());
    return critere === 'date-desc' ? copie.reverse() : copie;
  }
}
