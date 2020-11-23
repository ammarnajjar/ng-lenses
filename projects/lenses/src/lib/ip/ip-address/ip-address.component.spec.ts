import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IpAddressComponent,
  ipAdressFormatter,
  ipAdressValidator,
} from './ip-address.component';

describe('IpAddressComponent', () => {
  let component: IpAddressComponent;
  let fixture: ComponentFixture<IpAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpAddressComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('ipAdressFormatter', () => {
  const parameters = [
    ['1', '1'],
    ['123', '123.'],
    ['123.12', '123.12'],
    ['123.123', '123.123.'],
    ['123.123.123', '123.123.123.'],
    ['123.123.123.123', '123.123.123.123'],
    ['1.123.1.123', '1.123.1.123'],
    ['1.123.1.123456', '1.123.1.123'],
    ['1.12345.1.1', '1.123.1.1'],
    ['12345.1.1.1', '123.1.1.1'],
    ['1.1.12345.1', '1.1.123.1'],
    ['12345.1.12345.1', '123.1.123.1'],
  ];
  parameters.forEach(([input, output]) => {
    it(`add a dot automatically ${input} => ${output}`, () => {
      const sut = new FormControl(input);
      ipAdressFormatter(sut);
      expect(sut.value).toEqual(output);
    });
  });

  it('does not validate at all', () => {
    const sut = new FormControl('');
    expect(ipAdressFormatter(sut)).toBeNull();
  });
});
describe('ipAdressValidator', () => {
  const invalid = { valid: false };
  const wrongIpAdresses = [
    '..1.1',
    '1',
    '1.1',
    '1.1.',
    '1.1.1',
    '123.123.12',
    '1.1.1.',
    '1.1.1.256',
    '256.1.1.1',
    '1.256.1.1',
    '1.1.1.256',
    '1.1.256.1',
    '256.256.256.256',
    'a',
    'a.a',
    'a.a.',
    'a.a.a',
    'a.a.a.',
    'a.a.a.a',
  ];
  it('validates correct ip address', () => {
    const ipAddress = new FormControl('1.1.1.1');
    expect(ipAdressValidator(ipAddress)).toBeNull();
  });

  wrongIpAdresses.forEach(ip => {
    it(`validates wrong ip address ${ip}`, () => {
      const ipAddress = new FormControl(ip);
      expect(ipAdressValidator(ipAddress)).toEqual(invalid);
    });
  });
});
