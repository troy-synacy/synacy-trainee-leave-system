import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidators {
  static noPastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const date = new Date(value);
      if (isNaN(date.getTime())) return null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today ? { pastDateNotAllowed: true } : null;
    };
  }

  static noWeekends(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const date = new Date(value);
      if (isNaN(date.getTime())) return null;
      const d = date.getDay();
      return (d === 0 || d === 6) ? { weekendNotAllowed: true } : null;
    };
  }

  static dateRange(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      if (!group || !group.get) return null;
      const startVal = group.get('startDate')?.value;
      const endVal = group.get('endDate')?.value;
      if (!startVal || !endVal) return null;
      const start = new Date(startVal);
      const end = new Date(endVal);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
      return end < start ? { invalidRange: true } : null;
    };
  }
}
