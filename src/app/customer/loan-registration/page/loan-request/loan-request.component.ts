import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BookSelectorComponent } from '../../components/book-selector/book-selector.component';
import { LoanFormComponent } from '../../components/loan-form/loan-form.component';
import { StatusRequestsComponent } from '../../components/status-requests/status-requests.component';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RegistrarPrestamoComponent } from '../../components/registrar-prestamo/registrar-prestamo.component';

@Component({
  selector: 'app-loan-request',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatDividerModule,BookSelectorComponent,LoanFormComponent,StatusRequestsComponent,HttpClientModule,RegistrarPrestamoComponent],
    templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent {
  selectedBooks: number[] = [];

  onSelectedBooks(ids: number[]) {
    this.selectedBooks = ids;
  }
}
