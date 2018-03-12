import { Component, OnInit, Inject } from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertylistService } from './propertylist.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {PropertydetailsComponent} from '../propertydetails/propertydetails.component';


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
  constructor(private propertylistService: PropertylistService,
              private dialog: MatDialog) { }

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

  openDetails(property: Property) {
    console.log(property);
    this.dialog.open(PropertydetailsComponent, {
      data: {
        property
      }
    });
  }
}
