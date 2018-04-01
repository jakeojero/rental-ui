import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { Property } from '../../core/shared/models/Property';
import { PropertylistService } from './propertylist.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {PropertydetailsComponent} from '../propertydetails/propertydetails.component';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap';
import { SpinnerService } from '../spinner/spinner.service';


@Component({
  selector: 'app-propertylist',
  templateUrl: './propertylist.component.html',
  styleUrls: ['./propertylist.component.scss']
})
export class PropertylistComponent implements OnInit, OnDestroy {

  searchBy: string;
  search: string;
  stream;
  openModal = false;
  selectedProperty;

  properties: any = [];
  property: Property;

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private propertylistService: PropertylistService,
              private dialog: MatDialog,
              private spinner: SpinnerService) { }

  ngOnInit() {
    // Load properties
    this.spinner.spin();
    this.propertylistService.getProperties().subscribe(properties => {
      this.properties = properties.body;
      this.spinner.hide();
      this.stream = this.propertylistService.observeMessages('/api/properties/stream')
        .subscribe((stream) => {

        const property = JSON.parse(stream);

        const found = this.properties.find(prop => {
          return prop.id === property.id;
        });

        if (found === undefined) {
          this.properties.push(property);
        }
      });

    });


  }

  ngOnDestroy(): void {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }

  onSearchChange($event) {
    this.search = $event;
  }

  onSearchByChange($event) {
    this.searchBy = $event;
  }

  openDetails(property) {
    this.selectedProperty = property;
    this.openModal = true;
  }
}
