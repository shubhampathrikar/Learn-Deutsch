import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import Papa from 'papaparse';

import { Flashcard } from '../models/flashcard';

@Injectable({
  providedIn: 'root',
})
export class FlashcardData {
  private http = inject(HttpClient);

  loadCards(): Observable<Flashcard[]> {
    return this.http.get('/data/german-a1.csv', { responseType: 'text' }).pipe(
      map((csv) => {
        const result = Papa.parse<Flashcard>(csv, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        if (result.errors.length > 0) {
          console.error('CSV parsing errors:', result.errors);
        }

        return result.data
          .filter((card) => card.german?.trim() && card.english?.trim() && card.category?.trim())
          .map((card) => ({
            ...card,
            id: Number(card.id),
            german: card.german.trim(),
            english: card.english.trim(),
            category: card.category.trim(),
          }));
      }),
    );
  }
}
