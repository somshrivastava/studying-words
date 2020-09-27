import { Word } from './../manage/manage.component';
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
  collectionWords: Word[] = [];
  studying: boolean;
  currentWord;
  currentCollection;
  collectionIndex = 0;

  constructor(private db: AngularFirestore, private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.getCollections();
  }

  studyCollection(collection) {
    this.studying = true;
    this.currentCollection = collection;
    this.collectionWords = this.sessionStorageService.get(`${this.currentCollection}`);
    this.currentWord = this.collectionWords[this.collectionIndex];
  }

  correctWord() {
    if (this.collectionIndex = this.collectionWords.length - 1) {
      console.log(this.collectionWords)
      console.log('asdf');
      this.collectionIndex = 0;
    } else {
      this.currentWord["isCorrect"] = true;
      this.collectionWords[this.collectionIndex]["isCorrect"] = true;
      console.log(this.collectionWords);
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.collectionIndex += 1;
      this.studyCollection(this.currentCollection);
    }
  }

  inCorrectWord() {
    if (this.collectionIndex = this.collectionWords.length - 1) {
      console.log('asdf');
      this.collectionIndex = 0;
    } else {
      this.currentWord["isCorrect"] = false;
      this.collectionWords[this.collectionIndex]["isCorrect"] = false;
      console.log(this.collectionWords);
      this.sessionStorageService.set(`${this.currentCollection}`, this.collectionWords);
      this.db.collection('studying-words').doc('studying-words').collection(`${this.currentCollection}`).doc(`${this.currentWord.name}`).set(this.currentWord);
      this.collectionIndex += 1;
      this.studyCollection(this.currentCollection);
    }
  }

  stopGame() {
    this.studying = false;
    this.collectionWords = [];
  }

  getCollections() {
    this.db.collection('studying-words').doc('studying-words').collection('allCollections').snapshotChanges()
      .subscribe(actionArray => {
        this.allCollections = actionArray.map(collection => {
          return collection.payload.doc.data()["name"];
        })
        console.log(this.allCollections);
      })
  }
}
