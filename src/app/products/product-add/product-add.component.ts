import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { ProductService } from "../../shared/service/product.service";
import { Product } from "../../shared/model/product.model";
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
declare var require: any;
const shortId = require("shortid");

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"],
})
export class ProductAddComponent implements OnInit {
  public productForm: FormGroup;

  constructor(
    public productService: ProductService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.productService.getProducts();
    this.studenForm();
  }

  studenForm() {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      image: [''],
      productId: "PROD_" + shortId.generate()
    })
  }

  ResetForm() {
    this.productForm.reset();
  }

  submitStudentData() {
    this.productService.createProduct(this.productForm.value);

    this.ResetForm();
    this.onCancel();
   };

  onCancel() {
    this.router.navigate(['../admin'], { relativeTo: this.route });
  }
}
