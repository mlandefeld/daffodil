import { TestBed } from '@angular/core/testing';

import { DaffProductImage } from '@daffodil/product';

import { DaffProductImageFactory } from '../../factories/product-image.factory';
import { DaffTestingProductService } from './product.service';
import { isProduct } from '../../helpers/product-helper';

describe('Driver | Testing | Product | ProductService', () => {
  let productService;
  let productImageFactory: DaffProductImageFactory;
  let stubProductImages: DaffProductImage[];

  beforeEach(() => {
    stubProductImages = new DaffProductImageFactory().createMany(5);

    TestBed.configureTestingModule({});

    productService = TestBed.inject(DaffTestingProductService);
    productImageFactory = TestBed.inject(DaffProductImageFactory);

    spyOn(productImageFactory, 'createMany').and.returnValue(stubProductImages);
    spyOn(productImageFactory, 'create').and.returnValue(stubProductImages[0]);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('getAll', () => {

    it('should return a list of products with images', () => {
      productService.getAll().subscribe(products => {
        expect(isProduct(products[0])).toBeTruthy();

        expect(products[0].images).toEqual(stubProductImages);
      });
    });
  });

  describe('getBestSellers', () => {

    it('should return an array of products with images', () => {
      productService.getBestSellers().subscribe(products => {
        expect(isProduct(products[0])).toBeTruthy();
        expect(products[0].images).toEqual(stubProductImages);
      });
    });
  });

  describe('get', () => {

    it('should return a single product with images', () => {
      productService.get('id').subscribe(product => {
        expect(isProduct(product)).toBeTruthy();
        expect(product.images).toEqual(stubProductImages);
      });
    });
  });
});
