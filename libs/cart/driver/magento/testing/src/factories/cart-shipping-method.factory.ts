import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import { MagentoMoney } from '@daffodil/driver/magento';
import { MagentoMoneyFactory } from '@daffodil/driver/magento/testing';
import {
  DaffModelFactory,
} from '@daffodil/core/testing';
import { MagentoCartShippingMethod } from '@daffodil/cart/driver/magento';

export class MockCartShippingMethod implements MagentoCartShippingMethod {
  carrier_code = faker.random.word();
  carrier_title = faker.random.words(2);
  method_title = faker.random.words(2);
  method_code = faker.random.word();
  amount = this.money();

  private money(): MagentoMoney {
    return (new MagentoMoneyFactory()).create()
  }
}

@Injectable({
  providedIn: 'root'
})
export class MagentoCartShippingMethodFactory extends DaffModelFactory<MagentoCartShippingMethod> {
  constructor() {
    super(MockCartShippingMethod);
  }
}
