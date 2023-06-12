import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCompDetailComponent } from './add-comp-detail/add-comp-detail.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillGeneratorComponent } from './bill-generator/bill-generator.component';
import { BillPdfGenratorComponent } from './bill-pdf-genrator/bill-pdf-genrator.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AddCompDetailComponent,
    CompanyDetailsComponent,
    BillGeneratorComponent,
    BillPdfGenratorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
