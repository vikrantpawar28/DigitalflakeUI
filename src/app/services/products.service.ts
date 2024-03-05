import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _url = 'http://localhost:3000/api/products';
  constructor(private _http: HttpClient) { }

  createProduct(product: any): Observable<any> {
    const headers = new HttpHeaders();
    return this._http.post<any>(`${this._url}`, product, { headers })
  }

  getAllProdData():Observable<any>{
    return this._http.get<any>(`${this._url}`)
  }


  deleteEntry(id:string):Observable<any>{
    return this._http.delete<any>(`${this._url}/${id}`)
  }

}
