import { SessionStorageService } from './../storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  allCollections = [];
  collectionWords = [];
  studying: boolean;
  currentWord;
  currentCollection;
  collectionIndex = 0;
  studyFinished: boolean;
  previousCollection;
  startTime;
  endTime;
  elapsedTime;

  constructor(private db: AngularFirestore, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.getAllCollections();
  }

  studyCollection(collection) {
    if (this.startTime == undefined) {
      this.startTime = new Date().getTime();
      console.log('Start:', this.startTime);
    }
    if (this.sessionStorageService.get(`${collection}`) == null || this.sessionStorageService.get(`${collection}`) == []) {
      this.db.collection('studying-words').doc('studying-words').collection(`${collection}`).snapshotChanges()
        .subscribe(actionArray => {
          this.collectionWords = actionArray.map(item => {
            return item.payload.doc.data()
          })
          this.sessionStorageService.set(`${collection}`, this.collectionWords);
          console.log('Firebase');
        })
    } else {
      this.collectionWords = this.sessionStorageService.get(`${collection}`);
      console.log('Session Storage')
    }
    setTimeout(() => {
      this.currentCollection = collection;
      this.currentWord = this.collectionWords[this.collectionIndex];
      this.studyFinished = false;
      this.studying = true;
    }, 500);
  }

  correctWord() {
    if (this.collectionIndex > this.collectionWords.length - 2) {
      this.endTime = new Date().getTime();
      console.log('End:', this.endTime);
      this.elapsedTime = this.endTime - this.startTime;
      console.log('Elapsed:', this.elapsedTime/1000);
      this.previousCollection = this.currentCollection;
      this.stopGame();
      this.studyFinished = true;
      this.db.collection('studying-words').doc('studying-words').collection('study-records').doc(`${new Date()}`).set({time: this.elapsedTime, name: `${new Date()}`, records: this.collectionWords});
    } else {
      this.currentWord["isCorrect"] = true;
      this.collectionWords[this.collectionIndex]["isCorrect"] = true;
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.collectionIndex += 1;
      this.studyCollection(this.currentCollection);
    }
  }

  inCorrectWord() {
    if (this.collectionIndex > this.collectionWords.length - 2) {
      this.endTime = new Date().getTime();
      console.log('End:', this.endTime);
      this.elapsedTime = this.endTime - this.startTime;
      console.log('Elapsed:', this.elapsedTime/1000);
      this.previousCollection = this.currentCollection;
      this.stopGame();
      this.studyFinished = true;
      this.db.collection('studying-words').doc('studying-words').collection('study-records').doc(`${new Date()}`).set({time: this.elapsedTime, name: `${new Date()}`, records: this.collectionWords});
    } else {
      this.currentWord["isCorrect"] = false;
      this.collectionWords[this.collectionIndex]["isCorrect"] = false;
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.collectionIndex += 1;
      this.studyCollection(this.currentCollection);
    }
  }

  stopGame() {
    this.startTime = undefined;
    this.endTime = undefined;
    this.elapsedTime = undefined;
    this.collectionIndex = 0;
    this.currentCollection = '';
    this.collectionWords = [];
    this.studying = false;
    this.studyFinished = false;
  }

  getAllCollections() {
    this.db.collection('studying-words').doc('studying-words').collection('allCollections').snapshotChanges()
      .subscribe(actionArray => {
        this.allCollections = actionArray.map(collection => {
          return collection.payload.doc.data()["name"];
        })
      })
  }
}
