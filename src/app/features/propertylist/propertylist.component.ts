import { Component, OnInit, Inject } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertylistService } from './propertylist.service';
@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit {

  properties: Property[] = new Array<Property>();
  property: Property;
  constructor(private propertylistService: PropertylistService) { }

  ngOnInit() {
    // Load properties
    this.propertylistService.getProperties().subscribe(property => {
      this.properties.push(<Property>property[0]);
    });
  }

}
