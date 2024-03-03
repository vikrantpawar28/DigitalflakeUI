import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { DeldialogComponent } from '../deldialog/deldialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _dialog: MatDialog
  ) {}

  openaddform = false;

  categoryForm: FormGroup = new FormGroup({});

  categories: any[] = [];

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.getData();
  }

  getData() {
    this._categoryService.getAllCategoryData().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  status: any[] = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
  ];

  applyFilter($event: Event) {}
  addnew() {
    this.openaddform = true;
  }
  close() {
    this.openaddform = false;
  }

  deleteDialog(id: string) {
    this._dialog.open(DeldialogComponent, {
      disableClose: true,
      data: { id: id },
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this._categoryService.addCategories(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.getData();
        },
        error: (error) => {
          console.log(error.error);
        },
      });
    }
  }
}
