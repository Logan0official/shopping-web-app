import { Product } from "../../shared/model/product.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../shared/service/product.service";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id;
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(
      (product) => {
        const y = { ...(product.payload.toJSON() as Product), $key: id };
        this.product = y;
      },
      (error) => {
        // this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
