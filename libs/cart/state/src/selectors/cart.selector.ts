import { DaffCart, DaffCartOrderResult } from '@daffodil/cart';

import { DaffCartFeatureMemoizedSelectors, getDaffCartFeatureSelector } from './cart-feature.selector';
import { DaffCartOrderMemoizedSelectors, getCartOrderSelectors } from './cart-order/cart-order.selector';
import { DaffCartStateMemoizedSelectors, getCartSelectors } from './cart/cart.selector';
import { getDaffCartItemEntitiesSelectors, DaffCartItemEntitiesMemoizedSelectors } from './cart-item-entities/cart-item-entities.selectors';
import { DaffStatefulCartItem } from '../models/stateful-cart-item';

export interface DaffCartMemoizedSelectors<
  T extends DaffCart = DaffCart,
	V extends DaffCartOrderResult = DaffCartOrderResult,
	U extends DaffStatefulCartItem = DaffStatefulCartItem
> extends DaffCartFeatureMemoizedSelectors<T, V>,
	DaffCartOrderMemoizedSelectors<V>,
	DaffCartStateMemoizedSelectors<T>,
	DaffCartItemEntitiesMemoizedSelectors<U> {}

const createCartSelectors = <
  T extends DaffCart = DaffCart,
	V extends DaffCartOrderResult = DaffCartOrderResult,
	U extends DaffStatefulCartItem = DaffStatefulCartItem
>(): DaffCartMemoizedSelectors<T> => {

	return {
		...getDaffCartFeatureSelector<T, V, U>(),
		...getCartOrderSelectors<T, V, U>(),
		...getCartSelectors<T, V, U>(),
		...getDaffCartItemEntitiesSelectors<T, V, U>()
	}
}

export const getDaffCartSelectors = (() => {
	let cache;
	return <
    T extends DaffCart = DaffCart,
		V extends DaffCartOrderResult = DaffCartOrderResult,
		U extends DaffStatefulCartItem = DaffStatefulCartItem
  >(): DaffCartMemoizedSelectors<T, V, U> => cache = cache
		? cache
		: createCartSelectors<T, V, U>();
})();
