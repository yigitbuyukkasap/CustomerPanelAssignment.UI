import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
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
        physicalAddress: 'asdfasdf',
        postalAddress: '',
      }
  };

  constructor(private readonly customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params =>{
        this.customerId = params.get('id');
        if(this.customerId)
          this.customerService.getCustomer(this.customerId)
          .subscribe(r =>{
            this.customer = r;
            if(this.customer.address == null )
            {
              this.customer.address = { physicalAddress: '' , postalAddress: ''};
            }

          },
          err => console.log('error response')
          );
      }
    );
  }

}
