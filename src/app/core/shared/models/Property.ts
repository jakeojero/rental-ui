import { PropertyDetails } from './PropertyDetails';
import { Locator } from './Locator';

export class Property {
  title: string;
  rooms: number;
  price: number;
  user: any;
  notes: string[] = [];
  locator: Locator;
}
