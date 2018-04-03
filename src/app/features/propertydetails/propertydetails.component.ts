import {Component, Inject, OnInit, Input} from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertyDetails } from '../../core/shared/models/PropertyDetails';
import { Locator } from '../../core/shared/models/Locator';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-propertydetails',
  templateUrl: './propertydetails.component.html',
  styleUrls: ['./propertydetails.component.scss']
})
export class PropertydetailsComponent implements OnInit {

  @Input() property: Property;
  @Input() editable: boolean;
  constructor() { }

  ngOnInit() {
  }

}
