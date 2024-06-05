
export interface AddContactEndpoint {
  firstName: string;
  lastName: string;
  birthdate?: string | Date;
  email?: string;
  phone?: number;
  street1?: string;
  street2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: number;
  country?: string;
}