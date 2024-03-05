import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-deldialog1',
  templateUrl: './deldialog1.component.html',
  styleUrls: ['./deldialog1.component.css']
})
export class Deldialog1Component {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},private _productService:ProductsService){}
  onDelete(){
    this._productService.deleteEntry(this.data.id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
