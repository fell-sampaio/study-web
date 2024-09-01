import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected UrlServiceV1: string = "https://localhost:7188/api/";

  protected getHeaderFormData() {
    return {
      headers: new HttpHeaders({
        'Content-Disposition': 'form-data; name="product"',
        'Authorization': `Bearer ${this.getUserToken()}`
      })
    };
  }

  protected getHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  protected getAuthHeaderJson(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getUserToken()}`
      })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('app.user'));
  }

  protected getUserToken(): string {
    return localStorage.getItem('app.token');
  }

  protected serviceError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(() => new Error(errMsg));
  }
}
