import { AbstractControl, ValidationErrors } from '@angular/forms';

// Au moins deux mots (prénom et nom)
export function nomComplet(control: AbstractControl): ValidationErrors | null {
  const mots = (control.value ?? '').trim().split(/\s+/).filter(Boolean);
  return mots.length >= 2 ? null : { nomComplet: true };
}
