import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { ProductService } from 'src/app/shared/service/product.service';
import { NbIconConfig, NbSearchService, NbToastrService } from '@nebular/theme';
import { ShortenPipe } from 'src/app/shared/pipe/shorten.pipe';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  favoruiteProducts: Product[];
  showDataNotFound = true;
  filteredSearch;

  constructor(public shorten: ShortenPipe, private productService: ProductService, private searchService: NbSearchService, private toastrService: NbToastrService) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.filteredSearch = data.term;
    });
  }

  ngOnInit() {
    this.getFavouriteProduct();
  }

  onSearch() {
    this.filteredSearch = '';
  }

  removeFavourite(product: Product) {
    this.productService.removeLocalFavourite(product);
    const iconConfig: NbIconConfig = { icon: 'trash-2-outline', pack: 'eva' };
    this.toastrService.warning('', `Item removed from favorites!`, iconConfig);
    this.getFavouriteProduct();
  }

  getFavouriteProduct() {
    this.favoruiteProducts = this.productService.getLocalFavouriteProducts();
  }

}
