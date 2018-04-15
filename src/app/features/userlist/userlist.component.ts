import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap';
import { SpinnerService } from '../spinner/spinner.service';
import { User } from '../../core/shared/models/User';
import { UserlistService } from './userlist.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit, OnDestroy {

  searchBy: string;
  search: string;
  stream;
  openModal = false;
  selectedUser;

  users: any = [];
  user: User;

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private userlistService: UserlistService,
              private dialog: MatDialog,
              private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin();
    this.userlistService.getUsers().subscribe(users => {
      this.users = users.body;
      this.spinner.hide();
      this.stream = this.userlistService.observeMessages('/api/users/stream')
        .subscribe((stream) => {

        const user = JSON.parse(stream);

        const found = this.users.find(prop => {
          return prop.id === user.id;
        });

        if (found === undefined) {
          this.users.push(user);
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

  openDetails(user) {
    this.selectedUser = user;
    this.openModal = true;
  }

}
