import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoanService } from '../../services/loan.service';
import { Prestamo } from '../../models/loan-history.model';

@Component({
  selector: 'app-status-requests',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './status-requests.component.html',
  styleUrl: './status-requests.component.scss'
})
export class StatusRequestsComponent implements OnInit {
  loans: Prestamo[] = [];
  displayedColumns: string[] = [
    'expand',
    'alquilerId',
    'clienteId',
    'nombreCliente',
    'estado',
    'fechaInicio',
    'fechaFin',
    'fechaDevolucion',
    'penalidad'
  ];

  expandedElement: Prestamo | null = null;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoanHistory().subscribe(data => {
      this.loans = data;
    });
  }
}
