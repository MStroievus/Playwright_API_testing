
export interface AddContact {
  firstName: string;
  lastName: string;
  birthdate?: string;
  email?: string;
  phone?: number;
  street1?: string;
  street2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: number;
  country?: string;
}


export interface AddContactWithID extends AddContact {
  id?: string
}