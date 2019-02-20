import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { DaffDriverInterface, DaffDriver } from '@daffodil/driver';
import { DaffDriverTestingModule } from '@daffodil/driver/testing';

import { CartEffects } from './cart.effects';
import { CartLoad, CartLoadSuccess, CartLoadFailure, AddToCart,
  AddToCartSuccess, AddToCartFailure } from '../actions/cart.actions';
import { Cart } from '../models/cart';
import { DaffCartFactory } from '../../testing/src/factories/cart.factory';

describe('Daffodil | Cart | CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  
  let mockCart: Cart;

  let cartFactory: DaffCartFactory;

  let daffDriver: DaffDriverInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DaffDriverTestingModule
      ],
      providers: [
        CartEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CartEffects);
    daffDriver = TestBed.get(DaffDriver);
    cartFactory = TestBed.get(DaffCartFactory);

    mockCart = cartFactory.create();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('when CartLoadAction is triggered', () => {

    let expected;
    const cartLoadAction = new CartLoad();
    
    describe('and the call to CartService is successful', () => {

      beforeEach(() => {
        spyOn(daffDriver.cartService, 'get').and.returnValue(of(mockCart));
        const cartLoadSuccessAction = new CartLoadSuccess(mockCart);
        actions$ = hot('--a', { a: cartLoadAction });
        expected = cold('--b', { b: cartLoadSuccessAction });
      });
      
      it('should dispatch a CartLoadSuccess action', () => {
        expect(effects.load$).toBeObservable(expected);
      });
    });

    describe('and the call to CartService fails', () => {
      
      beforeEach(() => {
        const error = 'Failed to load cart';
        const response = cold('#', {}, error);
        spyOn(daffDriver.cartService, 'get').and.returnValue(response);
        const cartLoadFailureAction = new CartLoadFailure(error);
        actions$ = hot('--a', { a: cartLoadAction });
        expected = cold('--b', { b: cartLoadFailureAction });
      });
      
      it('should dispatch a CartLoadFailure action', () => {
        expect(effects.load$).toBeObservable(expected);
      });
    });
  });

  describe('when AddToCartAction is triggered', () => {

    let expected;
    let productId: string;
    const qty = 1;
    const addToCartAction = new AddToCart({productId, qty});

    beforeEach(() => {
      productId =  '1001';
    });
    
    describe('and the call to CartService is successful', () => {

      beforeEach(() => {
        spyOn(daffDriver.cartService, 'addToCart').and.returnValue(of(mockCart));
        const addToCartSuccessAction = new AddToCartSuccess(mockCart);
        actions$ = hot('--a', { a: addToCartAction });
        expected = cold('--b', { b: addToCartSuccessAction });
      });
      
      it('should dispatch a CartLoadSuccess action', () => {
        expect(effects.addToCart$).toBeObservable(expected);
      });
    });

    describe('and the call to CartService fails', () => {
      
      beforeEach(() => {
        const error = 'Failed to add item to cart';
        const response = cold('#', {}, error);
        spyOn(daffDriver.cartService, 'addToCart').and.returnValue(response);
        const addToCartFailureAction = new AddToCartFailure(error);
        actions$ = hot('--a', { a: addToCartAction });
        expected = cold('--b', { b: addToCartFailureAction });
      });
      
      it('should dispatch a CartLoadFailure action', () => {
        expect(effects.addToCart$).toBeObservable(expected);
      });
    });
  });
});