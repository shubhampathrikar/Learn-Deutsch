import { Component, HostListener } from '@angular/core';
import { Flashcard as FlashcardModel } from '../../models/flashcard';
import { GERMAN_A1_CARDS } from '../../data/german-a1';

@Component({
  selector: 'app-flashcard',
  imports: [],
  templateUrl: './flashcard.html',
  styleUrl: './flashcard.css',
})
export class Flashcard {
  cards: FlashcardModel[] = GERMAN_A1_CARDS;
  selectedCategory = 'All';
  filteredCards: FlashcardModel[] = [...GERMAN_A1_CARDS];
  categories: string[] = [];

  currentIndex = 0;
  showAnswer = false;

  constructor() {
    this.categories = ['All', ...new Set(this.cards.map((card) => card.category))];
  }

  get currentCard(): FlashcardModel {
    return this.filteredCards[this.currentIndex];
  }

  flipCard() {
    this.showAnswer = !this.showAnswer;
  }

  nextCard() {
    if (this.currentIndex < this.filteredCards.length - 1) {
      this.currentIndex++;
      this.showAnswer = false;
    }
  }

  previousCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showAnswer = false;
    }
  }

  shuffleCards() {
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

  selectCategory(category: string) {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredCards = [...this.cards];
    } else {
      this.filteredCards = this.cards.filter((card) => card.category === category);
    }

    this.currentIndex = 0;
    this.showAnswer = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
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
