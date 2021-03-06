import { Injectable } from '@angular/core';

import { DaffModelFactory } from '@daffodil/core/testing';
import { DaffMockConfigurableCartItem } from '@daffodil/cart/testing';
import { DaffCartItemStateEnum, DaffStatefulConfigurableCartItem } from '@daffodil/cart/state';

export class DaffMockStatefulConfigurableCartItem extends DaffMockConfigurableCartItem implements DaffStatefulConfigurableCartItem {
	daffState: DaffCartItemStateEnum.Default;
}

@Injectable({
  providedIn: 'root'
})
export class DaffStatefulConfigurableCartItemFactory extends DaffModelFactory<DaffStatefulConfigurableCartItem> {

  constructor(){
    super(DaffMockStatefulConfigurableCartItem);
  }
}
