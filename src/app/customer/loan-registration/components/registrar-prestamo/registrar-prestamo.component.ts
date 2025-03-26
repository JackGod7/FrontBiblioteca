import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { PrestamoRequest } from '../../models/loan.model';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.component.html',
  styleUrls: ['./registrar-prestamo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
})
export class RegistrarPrestamoComponent implements OnInit {
  prestamoForm!: FormGroup;

  constructor(
    private loanService: LoanService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.prestamoForm = new FormGroup({
      clienteId: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      copias: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^(\d+,)*\d+$/),
          RegistrarPrestamoComponent.maxThreeCopiasValidator,
          RegistrarPrestamoComponent.noRepeatedCopiasValidator,
        ],
      }),
    });
  }

  static maxThreeCopiasValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const ids = value
      .split(',')
      .map((v: string) => v.trim())
      .filter(Boolean);

    return ids.length > 3 ? { maxCopias: true } : null;
  }

  static noRepeatedCopiasValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const ids = value
      .split(',')
      .map((v: string) => v.trim())
      .filter(Boolean);

    const unique = new Set(ids);
    return unique.size !== ids.length ? { repeatedCopias: true } : null;
  }

  onSubmit(): void {
    if (this.prestamoForm.valid) {
      const request: PrestamoRequest = {
        clienteId: this.prestamoForm.value.clienteId,
        copias: this.prestamoForm.value.copias
          .split(',')
          .map((id: string) => Number(id.trim())),
      };

      this.loanService.registrarPrestamo(request).subscribe({
        next: (response) =>
          this.snackBar.open(
            `✅ Préstamo registrado. ID de reserva: ${response.reservaId}`,
            'Cerrar',
            { duration: 4000, panelClass: ['snackbar-success'] }
          ),
        error: (error) =>
          this.snackBar.open(
            `❌ Error al registrar el préstamo: ${error.message}`,
            'Cerrar',
            { duration: 4000, panelClass: ['snackbar-error'] }
          ),
      });
    }
  }
}
