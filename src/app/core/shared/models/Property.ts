import { PropertyDetails } from './PropertyDetails';
import { Locator } from './Locator';

export class Property {
  title: string;
  rooms: number;
  price: number;
  user: any;
  isPromoted: boolean;
  notes: string[] = [];
  locator: Locator;
}
