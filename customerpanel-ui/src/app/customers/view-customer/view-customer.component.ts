import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AddressService } from 'src/app/address/address.service';
import { Customer } from 'src/app/models/ui-models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customerId: string | null | undefined;
  customerName: string | null | undefined;
  customer: Customer = {
    id: '',
    name: '',
    description: '',
    phoneNumber: '',
    imageUrl: '',
    addressId:'',
    address:
      {
        physicalAddress: '',
        postalAddress: '',
      }
  };

  constructor(
     private readonly customerService: CustomerService,
     private route: ActivatedRoute,
     private addressService: AddressService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.customerId = params.get('id');

        //Customer varsa getirilip display edilmesi
        if(this.customerId)
        this.customerService.getCustomer(this.customerId)
          .subscribe(r =>{
            this.customer = r;

            // Customerin Addresinin Getirilmesi
            this.addressService.getCustomerAddress(this.customer.id).subscribe(
              rAddress =>{
                this.customer.address = { physicalAddress: rAddress.physicalAddress ,postalAddress: rAddress.postalAddress}
              }
            );
            if(this.customer.address == null )
                this.customer.address = { physicalAddress: '' , postalAddress: ''};

            },
            err => console.log('error response'));
      }
    );
  }

}
