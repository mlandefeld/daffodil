import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import { DaffCountry } from '@daffodil/geography';

import { DaffModelFactory } from '@daffodil/core/testing';

export class MockCountry implements DaffCountry {
  id = faker.random.uuid();
  name = faker.random.word();
	name_en = faker.random.word();
	alpha2 = faker.random.alphaNumeric(2);
	alpha3 = faker.random.alphaNumeric(3);
	subdivisions = [];
}

@Injectable({
  providedIn: 'root'
})
export class DaffCountryFactory extends DaffModelFactory<DaffCountry> {
  constructor() {
    super(MockCountry);
  }
}
