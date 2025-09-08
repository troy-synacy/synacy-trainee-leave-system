import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class LeaveCreditsValidator {
  static notExceedingCredits(maxCredits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const requestedDays = control.value;
      if (requestedDays && requestedDays > maxCredits) {
        return { exceedCredits: true };
      }
      return null;
    };
  }
}
