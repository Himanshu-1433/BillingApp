import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompDetailComponent } from './add-comp-detail/add-comp-detail.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { BillGeneratorComponent } from './bill-generator/bill-generator.component';
import { BillPdfGenratorComponent } from './bill-pdf-genrator/bill-pdf-genrator.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/Add-comp-detail',
  },
  { path: 'Add-comp-detail', component: AddCompDetailComponent },
  { path: 'Bill-Invoice-pdf', component: BillPdfGenratorComponent },
  { path: 'Company-details', component: CompanyDetailsComponent },
  { path: 'Bill-Generate', component: BillGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
