import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../shared/model/product.model';
import { ProductService } from '../../shared/service/product.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ShortenPipe } from 'src/app/shared/pipe/shorten.pipe';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  productList: Product[];
  loading = false;
  filteredSearch;

  page = 1;
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    public shorten: ShortenPipe,
    private router: Router,
    private route: ActivatedRoute,
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

  onEditProduct(key) {
    this.router.navigate([key, 'edit'], { relativeTo: this.route });
  }

  onNewProduct() {
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }
}
