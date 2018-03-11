import { RegisterUser } from './RegisterUser';
import { PropertyDetails } from './PropertyDetails';
import { Locator } from './Locator';

export class Property {
  user: RegisterUser;
  title: string;
  rooms: number;
  price: number;
  notes: string[];
  locator: Locator;
  details: PropertyDetails;
}
