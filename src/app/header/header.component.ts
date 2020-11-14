import { Component, OnInit } from '@angular/core';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/service/auth.service';
import { ProductService } from '../shared/service/product.service';
import { Product } from '../shared/model/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  product: Product;

  constructor(public authService: AuthService, public productService: ProductService, private toastrService: NbToastrService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout() {
    this.authService.logout();
    const iconConfig: NbIconConfig = { icon: 'lock-outline', pack: 'eva' };
    this.toastrService.warning('', `You are signed out!`, iconConfig);
  }
}
