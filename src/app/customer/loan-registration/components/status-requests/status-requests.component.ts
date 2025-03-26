import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Loan } from '../../models/loan.model';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-status-requests',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './status-requests.component.html',
  styleUrl: './status-requests.component.scss'
})
export class StatusRequestsComponent implements OnInit {
  loans: Loan[] = [];

  displayedColumns: string[] = ['id', 'books', 'status', 'date'];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getClientLoanRequests().subscribe(data => {
      this.loans = data;
    });
  }
}