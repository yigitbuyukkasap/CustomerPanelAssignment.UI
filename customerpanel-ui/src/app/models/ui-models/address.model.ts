import { Customer } from "./customer.model";

export interface Address{
  id: string,
  physicalAddress: string,
  postalAddress: string,
  customerId: string,
  customer: Customer
}
