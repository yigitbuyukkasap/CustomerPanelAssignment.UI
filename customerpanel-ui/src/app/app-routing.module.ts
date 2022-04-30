import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee/view-employee.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: CustomersComponent
  // },
  {
    path: 'customers',
    canActivate:[AuthGuard],
    component: CustomersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'customer/:id',
    canActivate:[AuthGuard],
    component: ViewCustomerComponent
  },
  {
    path: 'employee',
    canActivate:[AuthGuard],
    component: EmployeeComponent
  },
  {
    path: 'employee/:id',
    canActivate:[AuthGuard],
    component: ViewEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
