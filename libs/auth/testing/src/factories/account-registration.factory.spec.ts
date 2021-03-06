import { TestBed } from '@angular/core/testing';

import {
  DaffAccountRegistration,
} from '@daffodil/auth';

import { DaffAccountRegistrationFactory } from './account-registration.factory';

describe('Auth | Testing | Factories | DaffAccountRegistrationFactory', () => {
  let accountRegistrationFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffAccountRegistrationFactory]
    });

    accountRegistrationFactory = TestBed.inject(DaffAccountRegistrationFactory);
  });

  it('should be created', () => {
    expect(accountRegistrationFactory).toBeTruthy();
  });

  describe('create', () => {
    let result: DaffAccountRegistration;

    beforeEach(() => {
      result = accountRegistrationFactory.create();
    });

    it('should return an AccountRegistration with all required fields defined', () => {
      expect(result.customer).toBeDefined();
      expect(result.password).toBeDefined();
    });
  });

  describe('createMany', () => {
    let result: DaffAccountRegistration[];

    it('should create as many AccountRegistrations as desired', () => {
      result = accountRegistrationFactory.createMany(2);
      expect(result.length).toEqual(2);

      result = accountRegistrationFactory.createMany(3);
      expect(result.length).toEqual(3);
    })
  })
});
