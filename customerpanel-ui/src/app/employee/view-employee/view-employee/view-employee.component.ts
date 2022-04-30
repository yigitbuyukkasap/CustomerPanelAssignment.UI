import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/address/address.service';
import { CustomerService } from 'src/app/customers/customer.service';
import { Employee } from 'src/app/models/api-models/employee.model';
import { Customer } from 'src/app/models/ui-models/customer.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  employeeId: string | null | undefined;
  employeeName: string | null | undefined;
  employee: Employee = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    customerId: '',
  };

  customerList: Customer[] = [];
  employeeCustomerName = '';
  isNewEmployee = false;
  header = '';

  constructor(
    private readonly employeeService: EmployeeService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');

      //employee varsa getirilip display edilmesi
      if (this.employeeId)
        if (this.employeeId.toLowerCase() === 'Add'.toLocaleLowerCase()) {
          // Route Add Iceriyorsa -> new employee()
          this.isNewEmployee = true;
          this.header = 'Yeni Calisan Ekle';
          this.customerService
                .getAllCustomers()
                .subscribe((r) => (this.customerList = r));
        } else {
          this.isNewEmployee = false;
          // Update Existingemployee Fonksiyonu
          this.employeeService.getEmployee(this.employeeId).subscribe(
            (r) => {
              this.employee = r;
              this.customerService
                .getAllCustomers()
                .subscribe((r) => (this.customerList = r));
            },
            (err) => console.log('error response')
          );
        }
    });
  }

  onUpdate(): void {
    this.employeeService
      .updateEmployee(this.employee.id, this.employee)
      .subscribe(
        (r) => {
          this.snackbar.open(
            'Musteri basarili sekilde guncelendi.',
            undefined,
            { duration: 2000 }
          );
        },
        (err) => {
          this.snackbar.open('Calisan guncelleme basarisiz.', undefined, {
            duration: 2000,
          });
        }
      );
  }
  onDelete(): void {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      (r) => {
        this.snackbar.open('Calisan Silindi', undefined, { duration: 2000 });
        setTimeout(() => this.router.navigateByUrl('employee'), 1000);
      },
      (err) => {
        this.snackbar.open('Calisan silme basarisiz', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }

  onAdd(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      (r) => {
        this.snackbar.open('Calisan Basarili Sekilde Eklendi', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
        setTimeout(() => this.router.navigateByUrl(`employee/${r.id}`), 2000);
      },
      (err) => {
        this.snackbar.open('Calisan Ekleme Basarisiz', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
