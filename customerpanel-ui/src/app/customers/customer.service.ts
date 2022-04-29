import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/api-models/customer.model';
//import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('api/Customer/GetAll');
  }

  getCustomer(customerId: string): Observable<Customer> {
    return this.httpClient.get<Customer>('api/Customer/GetCustomer/' + customerId);
  }

}
