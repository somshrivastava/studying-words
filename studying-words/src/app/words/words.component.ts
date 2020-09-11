import { AngularFirestore } from '@angular/fire/firestore';
import { LocalStorageService } from './../local-storage.service';
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
  wordsCollection: string = '';
  recordedStats = [];

  constructor(private localStorageService: LocalStorageService, private db: AngularFirestore) { }

  ngOnInit() { this.getRecordedStats(); }

  selectCollection(collection) {
    this.wordsCollection = collection;
    this.getWords();
  }

  getWords() {
    if (this.localStorageService.get('words') == null || []) {
      this.db.collection(`${this.wordsCollection}`).snapshotChanges()
      .subscribe(actionArray => {
        this.words = actionArray.map(item => {
          return item.payload.doc.data() as Word
        })
      this.localStorageService.set(`${this.wordsCollection}`, this.words);
      });
    } else {
      this.wordsCollection = this.localStorageService.get('words');
    }
  }

  getRecordedStats() {
    if (this.localStorageService.get('roundStats') == null || []) {
      this.db.collection('roundStats').snapshotChanges()
      .subscribe(actionArray => {
        this.recordedStats = actionArray.map(item => {
          return item.payload.doc.data();
        })
      this.localStorageService.set('roundStats', this.recordedStats);
      });
    } else {
      this.recordedStats = this.localStorageService.get('roundStats');
    }
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
    // (new Date().getMonth()+1) + '-' + new Date().getDate() + '-' + new Date().getFullYear()
    this.recordedStats.push({'timestamp': `${new Date}`, 'stats': data});
    this.db.collection('roundStats').doc(`${new Date}`).set({'timestamp': `${new Date}`, 'stats': data});
    this.localStorageService.set('roundStats', this.recordedStats);
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
