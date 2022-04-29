import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/api-models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }


  getCustomerAddress(customerId: string): Observable<Address>{
    return this.httpClient.get<Address>('api/Address/GetAddress/' + customerId);
  }

}
