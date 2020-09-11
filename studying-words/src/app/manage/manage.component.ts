import { LocalStorageService } from './../local-storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Word } from './../word.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {
  words = [];
  word: Word = {
    word: '',
    isCorrect: null
  }
  showAdd: boolean;
  wordsCollection: string = '';
  constructor(private db: AngularFirestore, private localStorageService: LocalStorageService) { }

  ngOnInit() { }

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

  addWord() {
    this.word['word'].split(',').forEach(word => {
      this.word = {
        word: word,
        isCorrect: null
      }
      this.db.collection(`${this.wordsCollection}`).doc(`${this.word.word}`).set(this.word);
      this.words.push(this.word);
      this.localStorageService.set(`${this.wordsCollection}`, this.words);
    });
    this.word = {
      word: '',
      isCorrect: null
    }
    this.showAdd = false;
  }

  deleteWord(word) {
    this.db.collection(`${this.wordsCollection}`).doc(`${word.word}`).delete();
    this.words.splice(this.words.indexOf(word), 1);
    this.localStorageService.set(`${this.wordsCollection}`, this.words);
  }
}
