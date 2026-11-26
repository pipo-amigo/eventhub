import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../modeles/evenement';
import { Evenements } from '../../services/evenements';
import { Session } from '../../services/session';
import { dateFuture } from '../../validateurs/date-future';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-nouvel-evenement',
  templateUrl: './nouvel-evenement.html',
})
export class NouvelEvenement implements OnInit {
  private evenements = inject(Evenements);
  private session = inject(Session);
  private router = inject(Router);

  categories: { valeur: Categorie; libelle: string }[] = [
    { valeur: 'atelier', libelle: 'Atelier' },
    { valeur: 'conference', libelle: 'Conférence' },
    { valeur: 'competition', libelle: 'Compétition' },
    { valeur: 'sortie', libelle: 'Sortie' },
  ];

  form = new FormGroup({
    titre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    categorie: new FormControl<Categorie | ''>('', [Validators.required]),
    club: new FormControl('', [Validators.required]),
    lieu: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required, dateFuture]),
    capacite: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(5),
      Validators.pattern(/^[0-9]+$/), // nombre entier
    ]),
    gratuit: new FormControl(false),
  });

  ngOnInit() {
    // Pré-remplit le club avec le nom de l'organisateur connecté
    this.form.patchValue({ club: this.session.utilisateur()?.nom ?? '' });
  }

  get titre() { return this.form.controls.titre; }
  get description() { return this.form.controls.description; }
  get categorie() { return this.form.controls.categorie; }
  get club() { return this.form.controls.club; }
  get lieu() { return this.form.controls.lieu; }
  get date() { return this.form.controls.date; }
  get capacite() { return this.form.controls.capacite; }

  publier() {
    if (this.form.invalid) {
      return; // le bouton est désactivé, mais on vérifie quand même
    }
    const v = this.form.getRawValue();
    const id = this.evenements.ajouter({
      titre: v.titre ?? '',
      description: v.description ?? '',
      categorie: v.categorie as Categorie,
      club: v.club ?? '',
      lieu: v.lieu ?? '',
      date: new Date(v.date ?? ''), // "2027-01-15T14:00" → objet Date
      capacite: Number(v.capacite),
      gratuit: v.gratuit ?? false,
    });
    // Navigation programmatique vers le détail du nouvel événement
    this.router.navigate(['/evenements', id]);
  }
}
