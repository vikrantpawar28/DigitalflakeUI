import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { DeldialogComponent } from '../deldialog/deldialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _dialog: MatDialog,private http: HttpClient
  ) {
    this.filteredCategories = this.categories; 
  }
  apiUrl: string = 'http://localhost:3000/api/categories/';
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
  filteredCategories: any[] = [];
  searchTerm: string = '';

  search() {
    if (this.searchTerm.trim() === '') {
      // If search term is empty, show all categories
      this.filteredCategories = this.categories;
    } else {
      // Filter categories based on search term
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  openeditform=false;
editCatdata:any;
catid='';
  editToggel(catData:any){
    this.catid=catData._id
    this.openeditform = true;
    const formData = this.categoryForm.value;

    this.categoryForm.patchValue({
      name: catData.name,
      description: catData.description,
      status: catData.status
    });
  }
  editCategory() {
  
    const formData = this.categoryForm.value;

    this.http.put(this.apiUrl + this.catid, formData).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        alert("updated successfully");
        
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
    
    }
  
  
  onSubmit() {
    if (this.categoryForm.valid) {
      this._categoryService.addCategories(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.getData();
          alert("category added sucessfully");
        },
        error: (error) => {
          console.log(error.error);
        },
      });
    }
  }
}
