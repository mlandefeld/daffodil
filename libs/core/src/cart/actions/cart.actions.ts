import { Action } from '@ngrx/store';

import { Cart } from '../model/cart';

export enum CartActionTypes {
    CartLoadAction = "[Cart] Load Action",
    CartLoadSuccessAction = "[Cart] Load Success Action",
    CartLoadFailureAction = "[Cart] Load Failure Action",
    CartResetAction = "[Cart] Reset Action"
}

export class CartLoad implements Action {
  readonly type = CartActionTypes.CartLoadAction;

  constructor() {}
}

export class CartLoadSuccess implements Action {
    readonly type = CartActionTypes.CartLoadSuccessAction;

    constructor(public payload: Cart) {}
}

export class CartLoadFailure implements Action {
  readonly type = CartActionTypes.CartLoadFailureAction;

  constructor(public payload: string) {}
}

export class CartReset implements Action {
    readonly type = CartActionTypes.CartResetAction;

    constructor() {}
}

export type CartActions = 
    | CartLoad 
    | CartLoadSuccess
    | CartLoadFailure
    | CartReset;