import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flashcard } from './components/flashcard/flashcard';

@Component({
  imports: [RouterOutlet, Flashcard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('german-flashcards');
}
