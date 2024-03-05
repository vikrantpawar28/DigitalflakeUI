import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-deldialog',
  templateUrl: './deldialog.component.html',
  styleUrls: ['./deldialog.component.css']
})
export class DeldialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string},private _categoryService:CategoryService){}

  onDelete(){
    this._categoryService.deleteEntry(this.data.id).subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
