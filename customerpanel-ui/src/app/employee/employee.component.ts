import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/api-models/employee.model';
import { CustomerService } from '../customers/customer.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee[] = [];

  displayedColumns: string[] = ['name', 'lastname', 'phoneNumber', 'email','edit'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  message = 'Giris Yapmadiniz';



  constructor(private employeeService: EmployeeService,
    private http: HttpClient,
    private customerService: CustomerService,
    private snackbar: MatSnackBar) { }

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
    this.employeeService.getAllEmployee().subscribe(
      (successResponse) => {
        this.employee = successResponse;
        this.dataSource = new MatTableDataSource<Employee>(this.employee);

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
  filterEmployee() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
