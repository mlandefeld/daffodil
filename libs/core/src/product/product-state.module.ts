import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';

import { ProductGridEffects } from './effects/product-grid.effects';

@NgModule({
  imports: [
      StoreModule.forFeature('product', reducers),
      EffectsModule.forFeature([
        ProductGridEffects
      ]),
  ]
})
export class CoreProductStateModule { }
