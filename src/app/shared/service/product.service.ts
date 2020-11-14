import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Product } from "../model/product.model";
import { AuthService } from "../service/auth.service";
import { NbIconConfig, NbToastrService } from '@nebular/theme';

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;

  favouriteProducts: AngularFireList<FavouriteProduct>;
  cartProducts: AngularFireList<FavouriteProduct>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) { }

  getProduct(index: string) {
    return this.products[index];
  }

  getProducts() {
    this.products = this.db.list("products");
    return this.products;
  }

  createProduct(data: Product) {
    this.products.push(data);
  }

  getProductById(key: string) {
    this.product = this.db.object("products/" + key);
    return this.product;
  }

  updateProduct(data: Product) {
    this.product.update(data);
  }

  deleteProduct(key: string) {
    this.products.remove(key);
  }


  //  ----------  Favourite Product Function  ----------

  async getUsersFavouriteProduct() {
    const user = await this.authService.user$.toPromise();
    this.favouriteProducts = this.db.list("favouriteProducts", (ref) =>
      ref.orderByChild("userId").equalTo(user.$key)
    );
    return this.favouriteProducts;
  }

  addFavouriteProduct(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avf_item")) || [];
    a.push(data);
    setTimeout(() => {
      localStorage.setItem("avf_item", JSON.stringify(a));
    }, 500);

    const iconConfig: NbIconConfig = { icon: 'heart-outline', pack: 'eva' };
    this.toastrService.success('', `The product has been added to favorites!`, iconConfig);
  }

  getLocalFavouriteProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avf_item")) || [];

    return products;
  }

  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  removeLocalFavourite(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("avf_item", JSON.stringify(products));
  }


  //  ----------  Cart Product Function  ----------

  addToCart(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(data);
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
    }, 500);

    const iconConfig: NbIconConfig = { icon: 'shopping-cart-outline', pack: 'eva' };
    this.toastrService.success('', `The product  has been added to cart!`, iconConfig);
  }

  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === product.productId) {
        products.splice(i, 1);
        break;
      }
    }

    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }
}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
