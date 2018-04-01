import { SpinnerService } from './spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading: boolean;
  constructor(private spinner: SpinnerService) { }

  ngOnInit() {

    this.spinner.getSpinner().subscribe( (val: boolean) => {
      this.loading = val;
    });

  }

}
