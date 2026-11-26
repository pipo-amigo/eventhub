import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Fabrique de validateur : reçoit le nombre de places restantes en paramètre
// et renvoie la fonction de validation qui l'utilise.
export function placesDisponibles(restantes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const demandees = Number(control.value);
    return demandees <= restantes ? null : { placesDisponibles: { restantes } };
  };
}
