import { Component, input } from '@angular/core';
import { Categorie } from '../../modeles/evenement';

@Component({
  imports: [],
  selector: 'app-badge-categorie',
  styleUrl: './badge-categorie.css',
  templateUrl: './badge-categorie.html',
})
export class BadgeCategorie {
  categorie = input.required<Categorie>();
}
