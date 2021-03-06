import { createSelector, MemoizedSelector } from '@ngrx/store';

import { DaffProductReducersState } from '../../reducers/product-reducers-state.interface';
import { getDaffProductFeatureSelector } from '../product-feature.selector';
import { DaffProductReducerState } from '../../reducers/product/product-reducer-state.interface';
import { DaffProduct } from '../../models/product';

export interface DaffProductPageMemoizedSelectors<T extends DaffProduct = DaffProduct> {
	selectSelectedProductState: MemoizedSelector<object, DaffProductReducerState>;
	selectSelectedProductId: MemoizedSelector<object, T['id']>;
	selectSelectedProductQty: MemoizedSelector<object, number>;
	selectSelectedProductLoadingState: MemoizedSelector<object, boolean>;
	selectSelectedProduct: MemoizedSelector<object, T>;
}

const createProductPageSelectors = <T extends DaffProduct = DaffProduct>(): DaffProductPageMemoizedSelectors<T> => {

	const {
		selectProductState
	} = getDaffProductFeatureSelector<T>();

	/**
	 * Selector for product state.
	 */
	const selectSelectedProductState = createSelector(
		selectProductState,
		(state: DaffProductReducersState<T>) => state.product
	);

	/**
	 * Selector for the selected product's ID.
	 * @deprecated
	 */
	const selectSelectedProductId = createSelector(
		selectSelectedProductState,
		(state: DaffProductReducerState) => state.selectedProductId
	);

	/**
	 * Selector for the quantity of the product.
	 * @deprecated
	 */
	const selectSelectedProductQty = createSelector(
		selectSelectedProductState,
		(state: DaffProductReducerState) => state.qty
	);

	/**
	 * Selector for the loading state of the selected product.
	 */
	const selectSelectedProductLoadingState = createSelector(
		selectSelectedProductState,
		(state: DaffProductReducerState) => state.loading
	);

	/**
	 * Selects the selected product from product state and the selected product ID.
	 * @deprecated use selectProduct entities selector instead.
	 */
	const selectSelectedProduct = createSelector(
		selectProductState,
		selectSelectedProductId,
		(state: DaffProductReducersState<T>, id: T['id']) => state.products.entities[id]
	);

	return {
		selectSelectedProductState,
		selectSelectedProductId,
		selectSelectedProductQty,
		selectSelectedProductLoadingState,
		selectSelectedProduct
	}
}

export const getDaffProductPageSelectors = (() => {
	let cache;
	return <T extends DaffProduct>(): DaffProductPageMemoizedSelectors<T> => cache = cache
		? cache
		: createProductPageSelectors<T>();
})();
