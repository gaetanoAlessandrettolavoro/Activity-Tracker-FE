export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  propic?: string;
  codiceFiscale: string;
  birthDate: Date; // Data di nascita
  birthPlace: string; // Luogo di nascita
  residence: string; // Residenza
  position: string; // Inquadramento
  qualification: string; // Qualifica
  iban: string; // Codice Iban
  hireDate: Date; // Data assunzione
}
