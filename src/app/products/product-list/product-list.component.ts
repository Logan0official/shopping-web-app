import { Component, OnInit, PipeTransform } from "@angular/core";
import { Product } from "../../shared/model/product.model";
import { AuthService } from "../../shared/service/auth.service";
import { ProductService } from "../../shared/service/product.service";
import { NbIconConfig, NbSearchService, NbToastrService } from '@nebular/theme';
import { ShortenPipe } from 'src/app/shared/pipe/shorten.pipe';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  loading = false;
  filteredSearch;
  selectedItem = '';

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    public shorten: ShortenPipe,
    private searchService: NbSearchService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.filteredSearch = data.term;
    });
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = { ...element.payload.toJSON(), $key: element.key };
          this.productList.push(y as Product);
        });
      }
    );
  }

  onSearch() {
    this.filteredSearch = '';
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onLess() {
    this.productList.sort((a, b) => {return a.price - b.price});
  }

  onMore() {
    this.productList.sort((a, b) => {return b.price - a.price});
  }
}
