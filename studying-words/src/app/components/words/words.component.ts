import { Word } from './../../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})

export class WordsComponent implements OnInit {
  readWords = []
  words: Word[] = [
    {text: 'What'},
    {text: 'When'},
    {text: 'Who'}
  ];
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
    let wordIndex = this.randomNumber(0, this.words.length);
    if (this.readWords.length == this.words.length) {
      console.log(this.readWords);
    } else {
      if (this.readWords.includes(this.words[wordIndex].text)) {
        this.onLoad();
      } else {
        this.word.text = `${this.words[wordIndex].text}`;
      }  
    }
  }

  onCorrect(word) {
    word.correctness = true;
    this.readWords.push(this.word.text);
  }

  onIncorrect(word) {
    word.correctness = false;
    this.readWords.push(this.word.text);
  }
}
