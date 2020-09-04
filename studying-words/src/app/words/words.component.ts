import { WordsService } from './../words.service';
import { Word } from './../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  currentWord: Word;
  words = [];
  usedIndexes = [];
  usedWords: Word[] = [];
  randomIndex: number;
  roundFinished: boolean;
  statsRecorded: boolean;

  constructor(private wordsService: WordsService) { }

  ngOnInit() { 
    this.getWords();
   }

  getWords() {
    this.wordsService.getData('words').snapshotChanges().subscribe(actionArray => {
      this.words = actionArray.map(item => {
        return item.payload.doc.data() as Word
      })
    });
  }

  generateWord() {
    this.randomIndex = Math.floor(Math.random() * this.words.length)
    if (this.usedIndexes.includes(this.randomIndex)) {
      if (this.usedIndexes.length == this.words.length) {
        this.roundFinished = true;
      } else {
        this.generateWord();
      }
    } else {
      this.usedIndexes.push(this.randomIndex);
      this.currentWord = {word: this.words[this.randomIndex]['word'], isCorrect: null}
      this.usedWords.push(this.currentWord);
    }
  }

  recordStats(data) {
    this.wordsService.writeData('roundStats', {'timestamp': new Date(), 'stats': data});
    this.statsRecorded = true;
    setTimeout(() => {
      this.statsRecorded = false;
    }, 2000);
  }

  correctWord() {
    this.currentWord.isCorrect = true;
    this.generateWord();
  }

  inCorrectWord() {
    this.currentWord.isCorrect = false;
    this.generateWord();
  }

  finishRound() {
    this.roundFinished = false;
    this.usedWords = [];
    this.usedIndexes = [];
  }
}
