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
  MatToolbarModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule, MatChip, MatChipsModule, MatGridListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ClarityModule } from '@clr/angular';
import { PremiumGuard } from './gaurds/premium-guard';
import { TextEntryComponent } from './components/text-entry/text-entry.component';
import { PaymentComponent } from './components/payment/payment.component';

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
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    ClarityModule
  ],
  providers: [
    PremiumGuard
  ],
  declarations: [TextEntryComponent, PaymentComponent],
  exports: [CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    ClarityModule,
    TextEntryComponent
  ]
})
export class SharedModule { }
