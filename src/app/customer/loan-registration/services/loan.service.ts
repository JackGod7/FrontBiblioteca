import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { Loan, PrestamoRequest, PrestamoResponse } from '../models/loan.model';
import { Prestamo } from '../models/loan-history.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:3000'; // or mock

  constructor(private http: HttpClient) {}

  getAvailableBooks(): Observable<Book[]> {
    // Mocked fallback
    return of([
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software', available: true },
      { id: 2, title: 'Design Patterns', author: 'GoF', category: 'Software', available: true },
      { id: 3, title: '1984', author: 'George Orwell', category: 'Fiction', available: true },
    ]);
    // Uncomment to fetch from actual service when backend is ready
    // return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  submitLoanRequest(data: Loan): Observable<any> {
    return this.http.post(`${this.baseUrl}/loans`, data);
  }

  getClientLoanRequests(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loans`);
  }

  registrarPrestamo(request: PrestamoRequest): Observable<PrestamoResponse> {
    return this.http.post<PrestamoResponse>(`${this.baseUrl}/api/prestamos/registrar`, request)
      .pipe(
        catchError(error => {
          console.error('Error al registrar el préstamo:', error);
          throw error; // Propagar el error
        })
      );
  }
  getLoanHistory(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.baseUrl}/api/Prestamo/listar`).pipe(
      catchError(error => {
        console.error('Error al obtener historial de préstamos:', error);
        return of([]); // Devuelve lista vacía para no romper el componente
      })
    );
  }
}
