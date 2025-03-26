import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  otpForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern(/^\+\d{9,15}$/)]]
  });

  codeForm = this.fb.group({
    code: ['', Validators.required]
  });

  confirmationResult: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.snackBar.open('✅ Sesión iniciada con Google', 'Cerrar', { duration: 3000 });
    }).catch(err => {
      this.snackBar.open('❌ Error al iniciar sesión', 'Cerrar', { duration: 3000 });
      console.error(err);
    });
  }

  sendOtp() {
    const phone = this.otpForm.value.phone;
    const verifier = this.authService.createRecaptcha('recaptcha-container');
    this.authService.sendPhoneOtp(phone!, verifier)
      .then(result => {
        this.confirmationResult = result;
        this.snackBar.open('📲 OTP enviado', 'Cerrar', { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open('❌ Error al enviar OTP', 'Cerrar', { duration: 3000 });
        console.error(err);
      });
  }

  verifyCode() {
    const code = this.codeForm.value.code;
    this.confirmationResult.confirm(code)
      .then(() => {
        this.snackBar.open('✅ Teléfono verificado', 'Cerrar', { duration: 3000 });
      })
      .catch((err: any) => {
        this.snackBar.open('❌ Código inválido', 'Cerrar', { duration: 3000 });
        console.error(err);
      });
  }
}
