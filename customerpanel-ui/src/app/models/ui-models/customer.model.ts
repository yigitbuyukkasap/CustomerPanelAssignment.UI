import { Address } from "./address.model";

export interface Customer{
  id: string,
  name: string,
  description: string,
  phoneNumber: string,
  imageUrl: string,
  addressId: string,
  address: Address
}
