import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Session } from '../../services/session';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-connexion',
  styleUrl: './connexion.css',
  templateUrl: './connexion.html',
})
export class Connexion {
  private session = inject(Session);
  private router = inject(Router);

  retour = input(''); // reçoit ?retour=... de l'URL (renseigné par les guards)
  erreur = signal('');

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required]),
  });

  get email() { return this.form.controls.email; }
  get motDePasse() { return this.form.controls.motDePasse; }

  seConnecter() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const ok = this.session.connecter(v.email ?? '', v.motDePasse ?? '');
    if (!ok) {
      this.erreur.set('E-mail ou mot de passe incorrect.');
      return;
    }
    // Retour sur la page demandée avant la redirection du guard
    this.router.navigateByUrl(this.retour() || '/evenements');
  }
}
