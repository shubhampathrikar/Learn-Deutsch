import { TestBed } from '@angular/core/testing';
import { FlashcardData } from './flashcard-data';

describe('FlashcardData', () => {
  let service: FlashcardData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
