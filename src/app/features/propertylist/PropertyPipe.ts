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
          properties.filter(property => property.locator.address.indexOf(search) >= 0);
          break;
        case 'Province':
          properties.filter(property => property.locator.province.toLowerCase().indexOf(search.toLowerCase()) >= 0);
          break;
        case 'Rooms':
          properties.filter(property => property.rooms === Number(search));
          break;
        case 'Title':
          properties.filter(property => property.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);
          break;
        case 'City':
          properties.filter(property => property.locator.city.toLowerCase().indexOf(search.toLowerCase()) >= 0);
          break;
        case 'Price':
          properties.filter(property => property.price <= Number(search));
          break;
      }

      return properties.sort((propertyA, propertyB) => (+propertyB.isPromoted) - (+!propertyB.isPromoted));
    } else {
      return properties;
    }

  }
}
