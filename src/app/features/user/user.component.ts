import {Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../core/shared/models/User';
import { Locator } from '../../core/shared/models/Locator';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
