import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evenements } from '../../services/evenements';
import { CarteEvenement } from '../../composants/carte-evenement/carte-evenement';
import { FiltreEvenementsPipe } from '../../pipes/filtre-evenements';
import { CritereTri, TriEvenementsPipe } from '../../pipes/tri-evenements';

@Component({
  imports: [FormsModule, CarteEvenement, FiltreEvenementsPipe, TriEvenementsPipe],
  selector: 'app-liste',
  styleUrl: './liste.css',
  templateUrl: './liste.html',
})
export class Liste {
  evenements = inject(Evenements);

  // Barre de recherche (two-way binding avec ngModel)
  recherche = '';
  categorie = ''; // chaîne vide = toutes les catégories
  tri: CritereTri = 'date-asc';

  // Identifiants des événements ajoutés aux favoris (reçus des cartes enfants)
  favoris = signal<number[]>([]);

  ajouterFavori(id: number) {
    // On n'ajoute pas deux fois le même événement
    if (!this.favoris().includes(id)) {
      this.favoris.update((f) => [...f, id]);
    }
  }
}
