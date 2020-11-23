import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { isEmpty } from 'lodash-es';

const SEPARATOR = '.';

@Component({
  selector: 'lens-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.css'],
})
export class IpAddressComponent {
  @Input() label = 'IP-Address';
  @Input() isRequired = false;

  separator = SEPARATOR;

  ipAddress = new FormControl('', [
    Validators.required,
    ipAdressFormatter, // this is a hack
    ipAdressValidator,
  ]);
}

export function ipAdressFormatter(control: FormControl): null {
  let formattedValue: string = control.value;
  if (isEmpty(formattedValue)) {
    return null;
  }
  const bytes = formattedValue.split(SEPARATOR).map(byte => byte.substr(0, 3));
  formattedValue = bytes.join(SEPARATOR);
  const lastByte = bytes[bytes.length - 1].length;
  if (lastByte === 3 && bytes.length < 4) {
    formattedValue += SEPARATOR;
  }
  // TODO: refactor when getValidators() is implemented
  // https://github.com/angular/angular/pull/39235
  control.setValidators([Validators.required, ipAdressValidator]);
  control.patchValue(formattedValue);
  control.setValidators([
    Validators.required,
    ipAdressFormatter,
    ipAdressValidator,
  ]);
  return null;
}

export function ipAdressValidator(
  control: FormControl,
): { valid: boolean } | null {
  const ipAddress: string = control.value;
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g;
  let invalid = ipAddress.search(ipRegex) === -1;
  invalid =
    invalid ||
    ipAddress
      .split(SEPARATOR)
      .some(
        byte =>
          Number.parseInt(byte, 10) > 255 || Number.parseInt(byte, 10) < 0,
      );
  if (invalid) {
    return { valid: false };
  }
  return null;
}
