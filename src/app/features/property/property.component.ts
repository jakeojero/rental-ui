import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../core/shared/models/Property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @Input() property: Property;
  constructor() { }

  ngOnInit() {
    this.property = this.property;
  }

}
