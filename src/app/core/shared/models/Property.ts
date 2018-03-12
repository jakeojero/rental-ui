import { PropertyDetails } from './PropertyDetails';
import { Locator } from './Locator';

export class Property {
  user: {
    username: string,
    email: string
  };
  title: string;
  rooms: number;
  price: number;
  notes: string[];
  locator: Locator;
  details: PropertyDetails;
}
