import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/ui-models/customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  displayedColumns: string[] = ['name', 'description', 'phoneNumber', 'edit'];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  message = 'Giris Yapmadiniz';

  constructor(
    private customerService: CustomerService,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http.get('api/Customer/GetAll').subscribe(
      (r: any) => {
        this.message = `Hi ${r.name}`;
      },
      (err) => {
        console.log(err);
      }
    );

    // Fetch The Customers
    this.customerService.getAllCustomers().subscribe(
      (successResponse) => {
        this.customers = successResponse;
        this.dataSource = new MatTableDataSource<Customer>(this.customers);

        if (this.matPaginator) this.dataSource.paginator = this.matPaginator;
        if (this.matSort) this.dataSource.sort = this.matSort;
      },
      (errorResponse) =>
        this.snackbar.open('Musterilerin getirilmesinde hata.', undefined, {
          duration: 2000,
          verticalPosition: 'top',
        })
    );
  }

  filterCustomers() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
