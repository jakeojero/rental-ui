import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent implements OnInit {

  @Input() label: string;
  @Input() form: FormGroup;
  @Input() formValue: string;
  @Input() error: string;
  constructor() { }

  ngOnInit() {
  }

}
