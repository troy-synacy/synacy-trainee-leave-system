import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class DateValidators {
  static noPastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(control.value);
      return inputDate < today ? { pastDateNotAllowed: true } : null;
    };
  }

  static noWeekends(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      const day = date.getDay();
      return (day === 0 || day === 6) ? { weekendNotAllowed: true } : null;
    };
  }

  static dateRange(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get('startDate')?.value;
      const end = group.get('endDate')?.value;
      if (!start || !end) return null;

      const startDate = new Date(start);
      const endDate = new Date(end);
      return endDate < startDate ? { invalidRange: true } : null;
    };
  }
}
