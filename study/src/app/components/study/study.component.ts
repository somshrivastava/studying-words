import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  collections: any[] = [];
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService
      .getFirestoreCollection('collections')
      .subscribe(
        collection => {
          this.collections = collection.map(
            document => {
              return {
                documentID: document.payload.doc.id,
                ...document.payload.doc.data()
              }
            }
          )
        }
      )
  }

  studyCollection(collection) {
    if (this.startTime == undefined) {
      this.startTime = new Date().getTime();
    }
    this.dataService
      .getFirestoreCollection(`collections/${collection.documentID}`)
      .subscribe(
        collection => {
          this.collections = collection.map(
            document => {
              return {
                documentID: document.payload.doc.id,
                ...document.payload.doc.data()
              }
            }
          )
        }
      )
    setTimeout(() => {
      this.currentCollection = collection;
      this.currentWord = this.collectionWords[this.collectionIndex];
      this.studyFinished = false;
      this.studying = true;
    }, 500);
  }

  correctWord() {
    if (this.collectionIndex > this.collectionWords.length - 2) {
      this.currentWord["isCorrect"] = true;
      this.collectionWords[this.collectionIndex]["isCorrect"] = true;
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.endTime = new Date().getTime();
      console.log('End:', this.endTime);
      this.elapsedTime = this.endTime - this.startTime;
      console.log('Elapsed:', this.elapsedTime/1000);
      this.db.collection('studying-words').doc('studying-words').collection('study-records').doc(`${new Date()}`).set({time: this.elapsedTime/1000, name: `${new Date()}`, records: this.collectionWords});
      this.previousCollection = this.currentCollection;
      this.stopGame();
      this.studyFinished = true;
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
      this.currentWord["isCorrect"] = false;
      this.collectionWords[this.collectionIndex]["isCorrect"] = false;
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.endTime = new Date().getTime();
      console.log('End:', this.endTime);
      this.elapsedTime = this.endTime - this.startTime;
      console.log('Elapsed:', this.elapsedTime/1000);
      this.db.collection('studying-words').doc('studying-words').collection('study-records').doc(`${new Date()}`).set({time: this.elapsedTime/1000, name: `${new Date()}`, records: this.collectionWords});
      this.previousCollection = this.currentCollection;
      this.stopGame();
      this.studyFinished = true;
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
}
