export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  propic?: string;
  codiceFiscale: string;
}
