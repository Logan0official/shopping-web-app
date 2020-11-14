import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbSearchModule, NbTabsetModule, NbBadgeModule, NbToastrModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { FireBaseConfig } from '../environments/firebase.config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './products/admin/admin.component';
import { CartComponent } from './products/cart/cart.component';
import { CartCalculatorComponent } from './products/cart-calculator/cart-calculator.component';
import { FavouriteComponent } from './products/favourite/favourite.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
// import { AuthGuard } from './shared/guard/auth.guard';
import { AuthService } from './shared/service/auth.service';
import { ProductService } from './shared/service/product.service';
import { UserService } from './shared/service/user.service';
import { FilterPipe } from './shared/pipe/filter.pipe';
import { ShortenPipe } from './shared/pipe/shorten.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    AdminComponent,
    CartComponent,
    CartCalculatorComponent,
    FavouriteComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductsComponent,
    FilterPipe,
    ShortenPipe,
    // AuthGuard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
    CommonModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSearchModule,
    NbTabsetModule,
    NbBadgeModule,
    NbToastrModule.forRoot(),
    NbSelectModule
  ],
  providers: [
    ShortenPipe,
    ProductService,
    AuthService,
    UserService,
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
