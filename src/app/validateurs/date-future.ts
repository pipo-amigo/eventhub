import { AbstractControl, ValidationErrors } from '@angular/forms';

// Refuse une date passée. Un champ vide est laissé à Validators.required.
export function dateFuture(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const date = new Date(control.value);
  return date.getTime() > Date.now() ? null : { dateFuture: true };
}
