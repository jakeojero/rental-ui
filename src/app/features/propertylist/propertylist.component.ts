import { Component, OnInit } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit {

  properties: Property[];
  constructor() { }

  ngOnInit() {
    // Load properties
  }

}
