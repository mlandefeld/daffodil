import { Action } from '@ngrx/store';

import { DaffStateError } from '@daffodil/core/state';
import { DaffCartShippingRate } from '@daffodil/cart';

export enum DaffCartShippingMethodsActionTypes {
  CartShippingMethodsLoadAction = '[DaffCart] Shipping Methods Load Action',
  CartShippingMethodsLoadSuccessAction = '[DaffCart] Shipping Methods Load Success Action',
  CartShippingMethodsLoadFailureAction = '[DaffCart] Shipping Methods Load Failure Action',
}

export class DaffCartShippingMethodsLoad implements Action {
  readonly type = DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadAction;

  constructor() {}
}

export class DaffCartShippingMethodsLoadSuccess<T extends DaffCartShippingRate = DaffCartShippingRate> implements Action {
  readonly type = DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadSuccessAction;

  constructor(public payload: T[]) {}
}

export class DaffCartShippingMethodsLoadFailure implements Action {
  readonly type = DaffCartShippingMethodsActionTypes.CartShippingMethodsLoadFailureAction;

  constructor(public payload: DaffStateError) {}
}

export type DaffCartShippingMethodsActions<T extends DaffCartShippingRate = DaffCartShippingRate> =
  | DaffCartShippingMethodsLoad
  | DaffCartShippingMethodsLoadSuccess<T>
  | DaffCartShippingMethodsLoadFailure
