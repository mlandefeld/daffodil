import { InjectionToken } from '@angular/core';

import { DaffCategoryServiceInterface } from '../interfaces/category-service.interface';

//TODO(damienwebdev): This import is necessary until we ship Ivy packages, do not remove it.
//See: https://github.com/ng-packagr/ng-packagr/issues/1844
import { DaffProduct } from '@daffodil/product';

export const DaffCategoryDriver = new InjectionToken<DaffCategoryServiceInterface>('DaffCategoryDriver');
