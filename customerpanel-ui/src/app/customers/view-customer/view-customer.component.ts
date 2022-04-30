import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddressService } from 'src/app/address/address.service';
import { UpdateCustomerRequest } from 'src/app/models/api-models/update-customer-request.model';
import { Customer } from 'src/app/models/ui-models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
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
    addressId: '',
    address: {
      physicalAddress: '',
      postalAddress: '',
    },
  };
  isNewCustomer = false;
  header = '';

  constructor(
    private readonly customerService: CustomerService,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id');

      //Customer varsa getirilip display edilmesi
      if (this.customerId)
        if (this.customerId.toLowerCase() === 'Add'.toLocaleLowerCase()) {
          // Route Add Iceriyorsa -> new Customer()
          this.isNewCustomer = true;
          this.header = 'Yeni Musteri Ekle';
        } else {
          this.isNewCustomer = false;
          // Update ExistingCustomer Fonksiyonu
          this.customerService.getCustomer(this.customerId).subscribe(
            (r) => {
              this.customer = r;

              // Customerin Addresinin Getirilmesi
              this.addressService
                .getCustomerAddress(this.customer.id)
                .subscribe((rAddress) => {
                  this.header = ' Musteri : ' + this.customer.name;
                  this.customer.address = {
                    physicalAddress: rAddress.physicalAddress,
                    postalAddress: rAddress.postalAddress,
                  };
                });
              if (this.customer.address == null)
                this.customer.address = {
                  physicalAddress: '',
                  postalAddress: '',
                };
            },
            (err) => console.log('error response')
          );
        }
    });
  }

  onUpdate(): void {
    this.customerService
      .updateCustomer(this.customer.id, this.customer)
      .subscribe(
        (r) => {
          this.snackbar.open(
            'Musteri basarili sekilde guncelendi.',
            undefined,
            { duration: 2000 }
          );
        },
        (err) => {
          this.snackbar.open('Musteri guncelleme basarisiz.', undefined, {
            duration: 2000,
          });
        }
      );
  }
  onDelete(): void {
    this.customerService.deleteCustomer(this.customer.id).subscribe(
      (r) => {
        this.snackbar.open('Musteri Silindi', undefined, { duration: 2000 });
        setTimeout(() => this.router.navigateByUrl('customers'), 2000);
      },
      (err) => {
        this.snackbar.open('Musteri silme basarisiz', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }

  onAdd(): void {
    this.customerService.addCustomer(this.customer).subscribe(
      (r) => {
        this.snackbar.open('Musteri Basarili Sekilde Eklendi', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
        setTimeout(() => this.router.navigateByUrl(`customer/${r.id}`), 2000);
      },
      (err) => {
        this.snackbar.open('Musteri Ekleme Basarisiz', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
