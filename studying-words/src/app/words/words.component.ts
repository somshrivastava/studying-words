import { AngularFirestore } from '@angular/fire/firestore';
import { SessionStorageService } from '../session-storage.service';
import { Word } from './../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})

export class WordsComponent implements OnInit {
  displayCursor: boolean;
  currentWord: Word;
  words = [];
  usedIndexes = [];
  usedWords: Word[] = [];
  randomIndex: number;
  roundFinished: boolean;
  wordsCollection: string = '';
  recordedStats = [];

  constructor(private sessionStorageService: SessionStorageService, private db: AngularFirestore) { }

  ngOnInit() { this.getRecordedStats(); }

  selectCollection(collection) {
    this.usedWords = [];
    this.usedIndexes = [];
    this.words = [];
    this.roundFinished = false;
    this.randomIndex = null;
    this.wordsCollection = collection;
    this.getWords();
  }

  getWords() {
    if (this.sessionStorageService.get(`${this.wordsCollection}`) == null) {
      this.db.collection('studying-words').doc('studying-words').collection(`${this.wordsCollection}`).snapshotChanges()
        .subscribe(actionArray => {
        this.words = actionArray.map(item => {
          return item.payload.doc.data() as Word
        })
      console.log('db', this.words)
      this.sessionStorageService.set(`${this.wordsCollection}`, this.words);
      });
    } else {
      console.log('sessionStorage', this.words);
      this.words = this.sessionStorageService.get(`${this.wordsCollection}`);
    }
  }

  getRecordedStats() {
    if (this.sessionStorageService.get('roundStats') == null || []) {
      this.db.collection('studying-words').doc('studying-words').collection('roundStats').snapshotChanges()
      .subscribe(actionArray => {
        this.recordedStats = actionArray.map(item => {
          return item.payload.doc.data();
        })
      this.sessionStorageService.set('roundStats', this.recordedStats);
      });
    } else {
      this.recordedStats = this.sessionStorageService.get('roundStats');
    }
  }

  generateWord() {
    this.randomIndex = Math.floor(Math.random() * this.words.length)
    if (this.usedIndexes.includes(this.randomIndex)) {
      if (this.usedIndexes.length == this.words.length) {
        this.roundFinished = true;
        this.recordStats();
      } else {
        this.generateWord();
      }
    } else {
      this.usedIndexes.push(this.randomIndex);
      this.currentWord = {word: this.words[this.randomIndex]['word'], isCorrect: null}
      this.usedWords.push(this.currentWord);
    }
  }

  recordStats() {
    this.recordedStats.push({'collection': `${this.wordsCollection}`, 'timestamp': `${new Date}`, 'stats': this.usedWords});
    this.db.collection('studying-words').doc('studying-words').collection('roundStats').doc(`${new Date}`).set({'collection': `${this.wordsCollection}`, 'timestamp': `${new Date}`, 'stats': this.usedWords});
    this.sessionStorageService.set('roundStats', this.recordedStats);
  }

  correctWord() {
    this.currentWord.isCorrect = true;
    this.generateWord();
    this.displayCursor = true;
  }

  inCorrectWord() {
    this.currentWord.isCorrect = false;
    this.generateWord();
    this.displayCursor = true;
  }

  finishRound() {
    this.roundFinished = false;
    this.usedWords = [];
    this.usedIndexes = [];
  }
}
