import { Component, OnInit } from '@angular/core';
import { NbIconConfig, NbSearchService, NbToastrService } from '@nebular/theme';
import { ProductService } from 'src/app/shared/service/product.service';
import { ShortenPipe } from 'src/app/shared/pipe/shorten.pipe';

import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts: Product[];
  showDataNotFound = true;
  filteredSearch;

  constructor(public shorten: ShortenPipe, private productService: ProductService, private searchService: NbSearchService, private toastrService: NbToastrService) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.filteredSearch = data.term;
    });
  }

  ngOnInit() {
    this.getCartProduct();
  }

  onSearch() {
    this.filteredSearch = '';
  }

  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);
    const iconConfig: NbIconConfig = { icon: 'trash-2-outline', pack: 'eva' };
    this.toastrService.warning('', `Item removed from cart!`, iconConfig);
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }
}
