import { Word } from './../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  currentWord: Word;
  words = ['Happy', 'There', 'Their'];
  usedWords = [];
  randomIndex: number;

  constructor() { }

  ngOnInit() {
    
  }

  generateWord() {
    this.randomIndex = Math.floor(Math.random() * this.words.length)
    if (this.usedWords.includes(this.randomIndex)) {
      if (this.usedWords.length == this.words.length) {
        console.log(this.usedWords);
      } else {
        this.generateWord();
      }
    } else {
      this.usedWords.push(this.randomIndex);
      this.currentWord = {'word': this.words[this.randomIndex], isCorrect: null};
    }
  }

  correctWord() {
    this.currentWord.isCorrect = true;
    this.generateWord();
  }

  inCorrectWord() {
    this.currentWord.isCorrect = false;
    this.generateWord();
  }
}
