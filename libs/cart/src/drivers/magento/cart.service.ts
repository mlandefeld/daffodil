import { Injectable, Inject } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Observable, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DaffCartServiceInterface } from '../interfaces/cart-service.interface';
import { DaffCart } from '../../models/cart';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';
import { getCart, createCart } from './queries/public_api';
import { DaffCartItemDriver, DaffCartItemServiceInterface } from '../interfaces/cart-item-service.interface';
import { DaffCartItem } from '../../models/cart-item';
import { DaffCartItemInput } from '../../models/cart-item-input';
import { MagentoGetCartResponse } from './models/responses/get-cart';
import { MagentoCreateCartResponse } from './models/responses/create-cart';

/**
 * A service for making Magento GraphQL queries for carts.
 */
@Injectable({
  providedIn: 'root'
})
export class DaffMagentoCartService implements DaffCartServiceInterface<DaffCart> {
  constructor(
    private apollo: Apollo,
    public cartTransformer: DaffMagentoCartTransformer,
    @Inject(DaffCartItemDriver) private cartItemDriver: DaffCartItemServiceInterface<
      DaffCartItem,
      DaffCartItemInput,
      DaffCart
    >
  ) {}

  get(cartId: string): Observable<DaffCart> {
    return this.apollo.query<MagentoGetCartResponse>({
      query: getCart,
      variables: {cartId}
    }).pipe(
      map(result => this.cartTransformer.transform(result.data.cart))
    );
  }

  create(): Observable<{id: string}> {
    return this.apollo.mutate<MagentoCreateCartResponse>({mutation: createCart}).pipe(
      map(result => ({id: result.data.createEmptyCart}))
    )
  }

  addToCart(productId: string, qty: number): Observable<DaffCart> {
    throw new Error('Method is deprecated. Use DaffCartItemServiceInterface#add instead.');
  }

  clear(cartId: string): Observable<Partial<DaffCart>> {
    return this.cartItemDriver.list(cartId).pipe(
      switchMap(items =>
				// make the delete requests in parallel and collect them into a single observable
				// return null if there are no items in the cart
        items.length ? zip(...items.map(item =>
          this.cartItemDriver.delete(cartId, item.item_id)
        )) : of(null)
      ),
      // find the most up to date delete response by looking for one with no items
      // make a get request if there were no items in the cart
			switchMap(updatedCarts => updatedCarts ? 
				of(updatedCarts.filter(cart => cart.items.length === 0).shift()) : 
				this.get(cartId))
    )
  }
}