import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit() {
    this.updateStudentData();
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  updateStudentData() {
    this.editForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      image: ['']
    })
  }

  updateForm(){
    this.productService.updateProduct(this.editForm.value);
    this.onChanel();
  }

  onChanel() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }

}
