import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Flashcard as FlashcardModel } from '../../models/flashcard';
import { FlashcardData } from '../../services/flashcard-data';

@Component({
  selector: 'app-flashcard',
  imports: [],
  templateUrl: './flashcard.html',
  styleUrl: './flashcard.css',
})
export class Flashcard implements OnInit {
  private flashcardData = inject(FlashcardData);

  cards: FlashcardModel[] = [];
  filteredCards: FlashcardModel[] = [];
  categories: string[] = [];

  selectedCategory = 'All';
  currentIndex = 0;
  showAnswer = false;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.flashcardData.loadCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.filteredCards = [...cards];

        this.categories = ['All', ...new Set(cards.map((card) => card.category))];

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load flashcards:', err);
        this.error = 'Unable to load vocabulary. Please try again.';
        this.loading = false;
      },
    });
  }

  get currentCard(): FlashcardModel | undefined {
    return this.filteredCards[this.currentIndex];
  }

  flipCard(): void {
    if (this.filteredCards.length > 0) {
      this.showAnswer = !this.showAnswer;
    }
  }

  nextCard(): void {
    if (this.currentIndex < this.filteredCards.length - 1) {
      this.showAnswer = false;
      this.currentIndex++;
    }
  }

  previousCard(): void {
    if (this.currentIndex > 0) {
      this.showAnswer = false;
      this.currentIndex--;
    }
  }

  shuffleCards(): void {
    this.filteredCards = [...this.filteredCards];

    for (let i = this.filteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.filteredCards[i], this.filteredCards[j]] = [
        this.filteredCards[j],
        this.filteredCards[i],
      ];
    }

    this.currentIndex = 0;
    this.showAnswer = false;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    this.filteredCards =
      category === 'All'
        ? [...this.cards]
        : this.cards.filter((card) => card.category === category);

    this.currentIndex = 0;
    this.showAnswer = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.previousCard();
        break;
      case 'ArrowRight':
        this.nextCard();
        break;
      case ' ':
        event.preventDefault();
        this.flipCard();
        break;
    }
  }
}
