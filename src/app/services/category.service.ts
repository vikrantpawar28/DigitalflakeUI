import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _url = 'http://localhost:3000/api/categories'
  constructor(private _http:HttpClient) { }

  addCategories(categories:any):Observable<any>{
    return this._http.post<any>(`${this._url}`,categories)
  }

  getAllCategoryData():Observable<any>{
    return this._http.get<any>(`${this._url}`)
  }

  deleteEntry(id:string):Observable<any>{
    return this._http.delete<any>(`${this._url}/${id}`)
  }

}
