import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'prop' })
export class PropertyPipe implements PipeTransform {
  transform(properties: Property[], searchBy: string, search: string): Property[] {

    if (searchBy && search && search.length > 0) {
      switch (searchBy) {
        case 'Address':
          return properties.filter(property => property.locator.address.indexOf(search) >= 0);
        case 'Province':
          return properties.filter(property => property.locator.province.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        case 'Rooms':
          return properties.filter(property => property.rooms === Number(search));
        case 'Title':
          return properties.filter(property => property.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        case 'City':
          return properties.filter(property => property.locator.city.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        case 'Price':
          return properties.filter(property => property.price <= Number(search));
      }
    } else {
      return properties;
    }

  }
}
