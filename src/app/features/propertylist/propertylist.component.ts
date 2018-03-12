import { Component, OnInit, Inject } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertylistService } from './propertylist.service';
import {PropertyPipe} from './PropertyPipe';

@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit {

  searchBy: string;
  search: string;

  properties: Property[] = [];
  property: Property;
  constructor(private propertylistService: PropertylistService) { }

  ngOnInit() {
    // Load properties
    this.propertylistService.getProperties().subscribe(properties => {
      this.properties = <Property[]>properties.body;
    });
  }

  onSearchChange($event) {
    this.search = $event;
  }

  onSearchByChange($event) {
    this.searchBy = $event;
  }

}
