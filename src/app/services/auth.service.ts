import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:3000/api/auth'
  constructor(private _http:HttpClient) { }

  userLogin(user:any):Observable<any>{
    return this._http.post<any>(`${this._url}/login`,user)
  }

  userRegister(user:any):Observable<any>{
    return this._http.post<any>(`${this._url}/signup`,user)
  }

  getToken():string | null{
    return localStorage.getItem('Token')
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

}
