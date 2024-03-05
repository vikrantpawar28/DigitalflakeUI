import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { DeldialogComponent } from '../deldialog/deldialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Deldialog1Component } from '../deldialog1/deldialog1.component';

interface Product {
  _id:string;
  productName: string;
  packSize: string;
  categoryName: string;
  mrp: number;
  productImage: string; // Assuming it's a string URL
  status: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _productService: ProductsService,private http: HttpClient,private _dialog: MatDialog
  ) { }

  productForm: FormGroup = new FormGroup({});

  categories: any[] = [];
  prodData: Product[] = [];


  status: any[] = [
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'Inactive' },
  ];

  openaddform = false;
  openEditform=false;
  selectedImage: File | null = null;


  ngOnInit(): void {
    this.getCategoryData();
    this.getProdData();

    this.productForm = this._fb.group({
      productName: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      packSize: ['', [Validators.required]],
      mrp: [0, [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
proId='';
  toggleEdit(editData:any){
    console.log(editData);
    this.proId=editData._id;
    this.openEditform=true;
    this.productForm.patchValue({
      productName: editData.productName,
      packSize: editData.packSize,
      categoryName: editData.categoryName,
      mrp: editData.mrp,
      productImage: editData.productImage,
      status: editData.status
    });


  }
  filteredCategories: any[] = [];
  searchTerm: string = '';




  search() {
    if (this.searchTerm.trim() === '') {
      // If search term is empty, show all categories
      this.filteredCategories = this.prodData;
    } else {
      // Filter categories based on search term
      this.filteredCategories = this.prodData.filter(prodData =>
        prodData.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        
        prodData.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  apiUrl="http://localhost:3000/api/products";
    editsubmin(){


    const formData = this.productForm.value;

    this.http.put(this.apiUrl + this.proId, formData).subscribe(
      (response) => {
        console.log('product updated successfully:', response);
        alert("product updated successfully")
        
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
    

  }
  deleteDialog(id: string) {
    this._dialog.open(Deldialog1Component, {
      disableClose: true,
      data: { id: id },
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
  getProdData() {
    this._productService.getAllProdData().subscribe({
      next: (response) => {
        this.prodData=response;
        console.log(this.prodData)
      },
      error: (error) => {
        console.log(error);
      },
    });}

  applyFilter($event: Event) { }
  addnew() {
    this.openaddform = true;
  }
  close() {
    this.openaddform = false;
  }

  selectImage(event: any) {
    this.selectedImage = event.target.files[0]
  }


  onSubmit() {
    if (this.productForm.valid && this.selectedImage) {

      const formData = new FormData();

      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });
      console.log(formData)

      formData.append('productImage', this.selectedImage);
      this._productService.createProduct(formData).subscribe({
        next: (response) => {
          console.log(response);
          alert("updated sucessfully");
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
