import { Pipe, PipeTransform } from '@angular/core';
import {Property} from '../../core/shared/models/Property';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'prop'})
export class PropertyPipe implements PipeTransform {
  transform(properties: Property[], searchBy: string, search: string): Property[] {

    if(search && search.length > 0) {
      switch (searchBy) {
        case 'Address':
          return properties.filter(property => property.locator.address.indexOf(search) >= 0);
        case 'Province':
          return properties.filter(property => property.locator.province.indexOf(search) >= 0);
      }
    }
    else {
      return properties;
    }

  }
}
