import { TestBed } from '@angular/core/testing';

import { DaffCartPaymentMethod } from '@daffodil/cart';

import { DaffCartPaymentFactory } from './cart-payment.factory';

describe('Cart | Testing | Factories | CartPaymentFactory', () => {

  let cartPaymentFactory: DaffCartPaymentFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaffCartPaymentFactory]
    });

    cartPaymentFactory = TestBed.inject(DaffCartPaymentFactory);
  });

  it('should be created', () => {
    expect(cartPaymentFactory).toBeTruthy();
  });

  describe('createMany', () => {
    let result: DaffCartPaymentMethod[];

    it('should create as many cart payments as desired', () => {
      result = cartPaymentFactory.createMany(2);
      expect(result.length).toEqual(2);

      result = cartPaymentFactory.createMany(3);
      expect(result.length).toEqual(3);
    })
  })
});
