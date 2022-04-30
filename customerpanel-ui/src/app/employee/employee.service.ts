import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeRequest } from '../models/api-models/employee-request.model';
import { Employee } from '../models/api-models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}
  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('api/Employee/GetAll');
  }

  getEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.get<Employee>(
      'api/Employee/GetEmployee/' + employeeId
    );
  }

  updateEmployee(employeeId: string, employee: Employee): Observable<Employee> {
    const employeeRequest: EmployeeRequest = {
      name: employee.name,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      customerId: employee.customerId,
    };

    return this.httpClient.put<Employee>(
      'api/Employee/UpdateEmployee/' + employeeId,
      employeeRequest
    );
  }
  deleteEmployee(employeeId: string): Observable<Object> {
    return this.httpClient.delete('api/Employee/DeleteEmployee/' + employeeId);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const employeeRequest: EmployeeRequest = {
      name: employee.name,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      customerId: employee.customerId,
    };
    return this.httpClient.post<Employee>(
      'api/Employee/AddEmployee/',
      employeeRequest
    );
  }
}
