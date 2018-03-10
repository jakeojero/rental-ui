import { Component, OnInit } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertyDetails } from '../../core/shared/models/PropertyDetails';
import { Locator } from '../../core/shared/models/Locator';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.scss']
})
export class PropertydetailsComponent implements OnInit {

  property: Property;
  propertyDetails: PropertyDetails;
  locator: Locator;
  constructor() { }

  ngOnInit() {
  }

}
