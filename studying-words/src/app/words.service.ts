import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private db: AngularFirestore) { }

  getData(collectionName) {
    return this.db.collection(`${collectionName}`);
  }

  writeData(collectionName, data) {
    this.db.collection(`${collectionName}`).doc(`${data.timestamp}`).set(data);
  }

  addData(collectionName, data) {
    return this.db.collection(`${collectionName}`).doc(`${data['word']}`).set(data);
  }

  deleteData(collectionName, data) {
    return this.db.collection(`${collectionName}`).doc(`${data['word']}`).delete();
  }
}
