import { Pipe, PipeTransform } from '@angular/core';
import { Evenement } from '../modeles/evenement';

// Pipe pur : renvoie un nouveau tableau filtré, sans modifier celui reçu
@Pipe({ name: 'filtreEvenements' })
export class FiltreEvenementsPipe implements PipeTransform {
  transform(evenements: Evenement[], recherche: string, categorie: string): Evenement[] {
    const q = recherche.trim().toLowerCase();
    return evenements
      .filter((e) => e.titre.toLowerCase().includes(q) || e.club.toLowerCase().includes(q))
      .filter((e) => !categorie || e.categorie === categorie);
  }
}
