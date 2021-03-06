import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddressService } from 'src/app/address/address.service';
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
  displayImageUrl = '';

  @ViewChild('customerDetailsForm') customerDetailsForm?: NgForm;

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
          this.setImage();
        } else {
          this.isNewCustomer = false;
          // Update ExistingCustomer Fonksiyonu
          this.customerService.getCustomer(this.customerId).subscribe(
            (r) => {
              this.customer = r;
              this.setImage();
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
            (err) => {
              this.setImage();
            }
          );
        }
    });
  }

  onUpdate(): void {
    if (this.customerDetailsForm?.form.valid) {
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
    if (this.customerDetailsForm?.form.valid) {
      this.customerService.addCustomer(this.customer).subscribe(
        (r) => {
          this.snackbar.open('Musteri Basarili Sekilde Eklendi', undefined, {
            duration: 2000,
            verticalPosition: 'top',
          });
          setTimeout(() => this.router.navigateByUrl(`customer/${r.id}`), 2000);
        },
        (err) => {
          this.snackbar.open(
            'Musteri Ekleme Basarisiz Hata : Lutfen Bos Alanlari Dogru Sekilde Doldurunuz ',
            undefined,
            {
              duration: 2000,
              verticalPosition: 'top',
            }
          );
        }
      );
    }
  }

  uploadImage(event: any): void {
    if (this.customerId) {
      const file: File = event.target.files[0];
      this.customerService.uploadImage(this.customer.id, file).subscribe(
        (r) => {
          this.customer.imageUrl = r;
          this.setImage();
          this.snackbar.open('Resim guncellend', undefined, {
            duration: 2000,
            verticalPosition: 'top',
          });
        },
        (err) => {}
      );
    }
  }
  private setImage(): void {
    if (this.customer.imageUrl) {
      this.displayImageUrl = this.customerService.getImagePath(
        this.customer.imageUrl
      );
    } else {
      this.displayImageUrl = '/assets/images.png';
    }
  }
}
