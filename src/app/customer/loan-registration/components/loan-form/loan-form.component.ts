import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss'
})
export class LoanFormComponent {
  @Input() selectedBookIds: number[] = [];

  loanForm: FormGroup;
  paymentMethods: string[] = ['Yape', 'Visa', 'Bank Transfer', 'Cash'];

  constructor(private fb: FormBuilder, private loanService: LoanService) {
    this.loanForm = this.fb.group({
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  submitLoanRequest(): void {
    if (this.loanForm.invalid || this.selectedBookIds.length === 0) {
      return;
    }

    const loan: Loan = {
      books: this.selectedBookIds,
      deliveryAddress: this.loanForm.value.address,
      paymentMethod: this.loanForm.value.paymentMethod
    };

    this.loanService.submitLoanRequest(loan).subscribe(() => {
      alert('Loan request submitted successfully ✅');
      this.loanForm.reset();
    });
  }
}