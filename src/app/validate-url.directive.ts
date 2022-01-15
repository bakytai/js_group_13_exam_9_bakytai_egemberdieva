import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const urlValidator = (control: AbstractControl): ValidationErrors | null => {
  const sevenSymbols = control.value.substr(0, 7);
  const eightSymbols = control.value.substr(0, 8);
  if(sevenSymbols === 'http://' || eightSymbols === 'https://') {
    return null;
  }
  return {url: true};
};

@Directive({
  selector: '[appUrl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateUrlDirective,
    multi: true
  }]
})
export class ValidateUrlDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return urlValidator(control);
  }
}
