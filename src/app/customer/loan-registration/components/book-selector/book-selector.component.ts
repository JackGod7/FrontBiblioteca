import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

import { Book } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-book-selector',
  standalone: true,
  imports:  [CommonModule, MatCardModule, MatListModule, MatCheckboxModule],
  templateUrl: './book-selector.component.html',
  styleUrl: './book-selector.component.scss'
})
export class BookSelectorComponent implements OnInit {
  books: Book[] = [];
  selectedBookIds: number[] = [];

  @Output() selectedBooks = new EventEmitter<number[]>();

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getAvailableBooks().subscribe(data => {
      this.books = data.filter(b => b.available);
    });
  }

  toggleSelection(bookId: number) {
    const index = this.selectedBookIds.indexOf(bookId);
    if (index >= 0) {
      this.selectedBookIds.splice(index, 1);
    } else if (this.selectedBookIds.length < 3) {
      this.selectedBookIds.push(bookId);
    }
    this.selectedBooks.emit(this.selectedBookIds);
  }

  isSelected(bookId: number): boolean {
    return this.selectedBookIds.includes(bookId);
  }
}