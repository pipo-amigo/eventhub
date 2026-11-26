import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnTete } from './composants/en-tete/en-tete';
import { PiedPage } from './composants/pied-page/pied-page';

@Component({
  imports: [RouterOutlet, EnTete, PiedPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
