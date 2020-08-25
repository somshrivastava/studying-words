import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})

export class WordsComponent implements OnInit {
  displayCard: boolean;
  words = ['Who', 'What', 'When', 'Where', 'Why', 'And', 'She', 'He', 'Other', 'About'];
  word: string;
  wordIndex: number;
  loaded: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onLoad() {
    this.displayCard = true;
    this.wordIndex = this.randomNumber(1, this.words.length)
    this.word = this.words[this.wordIndex]
  }

  onCorrect() {

  }

  onIncorrect() {

  }

  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
