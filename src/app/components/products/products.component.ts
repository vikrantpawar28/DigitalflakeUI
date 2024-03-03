import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { DeldialogComponent } from '../deldialog/deldialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _dialog: MatDialog
  ) {}

  productForm: FormGroup = new FormGroup({});

  categories: any[] = [];

  status: any[] = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
  ];

  openaddform = false;
  selectedFileName: string = '';

  ngOnInit(): void {
    this.getCategoryData();

    this.productForm = this._fb.group({
      productName: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      packSize: ['', [Validators.required]],
      mrp: [0, [Validators.required]],
      productImage: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  getCategoryData() {
    this._categoryService.getAllCategoryData().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter($event: Event) {}
  addnew() {
    this.openaddform = true;
  }
  close() {
    this.openaddform = false;
  }
  deleteDialog() {
    this._dialog.open(DeldialogComponent, {
      disableClose: true,
      // data: { id: id },
    });
  }
}
