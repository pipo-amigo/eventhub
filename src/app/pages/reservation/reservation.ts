import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Evenements } from '../../services/evenements';
import { Reservations } from '../../services/reservations';
import { Session } from '../../services/session';
import { nomComplet } from '../../validateurs/nom-complet';
import { placesDisponibles } from '../../validateurs/places-disponibles';
import { EtatPlacesPipe } from '../../pipes/etat-places';

@Component({
  imports: [ReactiveFormsModule, RouterLink, EtatPlacesPipe],
  selector: 'app-reservation',
  templateUrl: './reservation.html',
})
export class Reservation implements OnInit {
  private session = inject(Session);
  private evenements = inject(Evenements);
  reservations = inject(Reservations);

  id = input.required<string>(); // reçoit le :id de l'URL
  evenement = computed(() => this.evenements.trouver(Number(this.id())));

  restantes = computed(() => {
    const e = this.evenement();
    return e ? this.evenements.placesRestantes(e) : 0;
  });

  termine = computed(() => {
    const e = this.evenement();
    return e ? this.evenements.estTermine(e) : false;
  });

  confirmation = signal('');

  form = new FormGroup({
    nom: new FormControl('', [Validators.required, nomComplet]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
    nbPlaces: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(4)]),
    reglement: new FormControl(false, [Validators.requiredTrue]),
  });

  ngOnInit() {
    // Pré-remplit le nom avec celui de l'utilisateur connecté
    this.form.patchValue({ nom: this.session.utilisateur()?.nom ?? '' });

    // L'id (donc le nombre de places restantes) n'est connu qu'ici :
    // on ajoute alors le validateur personnalisé qui reçoit ce nombre en paramètre.
    this.nbPlaces.addValidators(placesDisponibles(this.restantes()));
    this.nbPlaces.updateValueAndValidity();
  }

  get nom() { return this.form.controls.nom; }
  get telephone() { return this.form.controls.telephone; }
  get nbPlaces() { return this.form.controls.nbPlaces; }
  get reglement() { return this.form.controls.reglement; }

  reserver() {
    const e = this.evenement();
    if (this.form.invalid || !e) {
      this.form.markAllAsTouched(); // fait apparaître toutes les erreurs
      return;
    }
    const v = this.form.getRawValue();
    const nb = Number(v.nbPlaces);
    this.reservations.reserver(e.id, nb, v.telephone ?? '');
    this.confirmation.set(`Merci ${v.nom} ! ${nb} place(s) réservée(s) pour « ${e.titre} ».`);
    this.form.reset();
  }
}
