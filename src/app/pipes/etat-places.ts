import { Pipe, PipeTransform } from '@angular/core';

// Transforme un nombre de places restantes en message. Le seuil est paramétrable (5 par défaut) :
// {{ restantes | etatPlaces }} ou {{ restantes | etatPlaces: 3 }}
@Pipe({ name: 'etatPlaces' })
export class EtatPlacesPipe implements PipeTransform {
  transform(restantes: number, seuil: number = 5): string {
    if (restantes <= 0) {
      return 'Complet';
    }
    if (restantes === 1) {
      return 'Dernière place !';
    }
    if (restantes <= seuil) {
      return `Plus que ${restantes} places`;
    }
    return `${restantes} places disponibles`;
  }
}
