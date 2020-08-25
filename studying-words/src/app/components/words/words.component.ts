import { Word } from './../../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})

export class WordsComponent implements OnInit {
  readWords = []
  words: Word[];
  word: Word = {
    text: '',
    correctness: false
  };
  
  constructor() { }

  ngOnInit() {
  }

  randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onLoad() {
  }

  onCorrect(word) {
  }

  onIncorrect(word) {
  }
}
