import { InjectionToken } from '@angular/core';

/**
 * A token to define the default category page size on a category page load. This value is 12 by default.
 */
export const DaffDefaultCategoryPageSize = new InjectionToken<number>('DaffDefaultCategoryPageSize');
