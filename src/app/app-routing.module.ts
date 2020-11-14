import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './products/cart/cart.component';
import { FavouriteComponent } from './products/favourite/favourite.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdminComponent } from './products/admin/admin.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', children: [
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent }
  ] },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', children: [
    { path: '', component: AdminComponent },
    { path: ':id/edit', component: ProductEditComponent, }
  ] },
  { path: 'new', component: ProductAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
