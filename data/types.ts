export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postCode: string;
  country?: string;
  state?: string;
  phone?: string;
}
