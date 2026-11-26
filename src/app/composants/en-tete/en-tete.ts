import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Session } from '../../services/session';
import { Reservations } from '../../services/reservations';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-en-tete',
  styleUrl: './en-tete.css',
  templateUrl: './en-tete.html',
})
export class EnTete {
  session = inject(Session);
  reservations = inject(Reservations);
  private router = inject(Router);

  deconnecter() {
    this.session.deconnecter();
    this.router.navigateByUrl('/evenements');
  }
}
