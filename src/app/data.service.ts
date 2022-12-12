import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  api_url = 'http://localhost:5000/api/customer/'
  constructor( private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.api_url}selectCustomers/`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  getCustomer(id:any): Observable<any> {
    return this.http.get<any>(`${this.api_url}selectCustomerById/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
  addCustomer(formData:any): Observable<any> {
    return this.http.post<any>(`${this.api_url}insertCustomer`,formData)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

}
