import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import { DaffNavigationTree } from '@daffodil/navigation';
import { DaffModelFactory } from '@daffodil/core/testing';

export class MockNavigationTree implements DaffNavigationTree {
  id = faker.random.uuid();
  name = '';
  path = faker.commerce.department().toString().toLowerCase();
  total_products = faker.random.number({min: 1, max: 10});
  children = [...Array(faker.random.number({min:1, max:3}))].map(() => this.fakeTree(3));
	children_count = 0;
	breadcrumbs = [];

  private fakeTree(depth: number = 0): DaffNavigationTree {
    const children = depth !== 0
      ? [...Array(faker.random.number({min:1, max:3}))].map(() => this.fakeTree(depth - 1))
      : [];

    if (depth <= 0) {
      const id = faker.random.uuid();

      return {
        id,
        name: faker.commerce.department(),
        path: faker.commerce.department().toString().toLowerCase(),
        total_products: faker.random.number({min: 1, max: 20}),
        children: [],
				children_count: 0,
				breadcrumbs: [{
					categoryId: id,
					categoryName: '',
					categoryLevel: 1,
					categoryUrlKey: faker.commerce.productMaterial()
				}]
      }
    } else {
      const id = faker.random.uuid();

      return {
        id,
        name: faker.commerce.department(),
        path: faker.commerce.department().toString().toLowerCase(),
        total_products: faker.random.number({min: 1, max: 20}),
        children: children,
				children_count: children.length,
				breadcrumbs: [{
					categoryId: id,
					categoryName: '',
					categoryLevel: 1,
					categoryUrlKey: faker.commerce.productMaterial()
				}]
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class DaffNavigationTreeFactory extends DaffModelFactory<DaffNavigationTree>{
  constructor(){
    super(MockNavigationTree);
  }
}
