import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatDividerModule,
  MatDialogModule,
  MatTooltipModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
