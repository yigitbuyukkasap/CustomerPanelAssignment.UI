import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCustomerRequest } from '../models/api-models/add-customer-request.model';
import { Customer } from '../models/api-models/customer.model';
import { UpdateCustomerRequest } from '../models/api-models/update-customer-request.model';
//import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>('api/Customer/GetAll');
  }

  getCustomer(customerId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(
      'api/Customer/GetCustomer/' + customerId
    );
  }

  updateCustomer(customerId: string, customer: Customer): Observable<Customer> {
    const updateCustomerRequest: UpdateCustomerRequest = {
      name: customer.name,
      description: customer.description,
      phoneNumber: customer.phoneNumber,
      physicalAddress: customer.address.physicalAddress,
      postalAddress: customer.address.postalAddress.toString(),
    };

    return this.httpClient.put<Customer>(
      'api/Customer/UpdateCustomer/' + customerId,
      updateCustomerRequest
    );
  }

  deleteCustomer(customerId: string): Observable<Object> {
    return this.httpClient.delete('api/Customer/DeleteCustomer/' + customerId);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    const addCustomerRequest: AddCustomerRequest = {
      name: customer.name,
      description: customer.description,
      phoneNumber: customer.phoneNumber,
      physicalAddress: customer.address.physicalAddress,
      postalAddress: customer.address.postalAddress.toString(),
    };
    return this.httpClient.post<Customer>(
      'api/Customer/AddCustomer/',
      addCustomerRequest
    );
  }

  uploadImage(customerId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post('api/Customer/UploadImage/' + customerId, formData, {
      responseType: 'text',
    });
  }

  getImagePath(relativePath: string){
    return`api/${relativePath}`;

  }
}
