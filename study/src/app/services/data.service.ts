import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  sessionStorage: Storage;

  constructor (private db: AngularFirestore) { 
    this.sessionStorage = window.sessionStorage; 
  }

  getFirestoreCollection(collection: string) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .snapshotChanges();
  }

  getFirestoreDocument(collection: string, documentID: string) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .doc(`${documentID}`)
      .snapshotChanges();
  }

  createFirestoreDocumentWithID(collection: string, documentID: string, newDocument: any) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .doc(`${documentID}`)
      .set(newDocument);
  }

  createFirestoreDocument(collection: string, newDocument: any) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .add(newDocument);
  }

  updateFirestoreDocument(collection: string, documentID: string, updatedDocument: any) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .doc(`${documentID}`)
      .set(updatedDocument);
  }

  deleteFirestoreDocument(collection: string, documentID: string) {
    return this.db
      .collection('studying-words')
      .doc('studying-words')
      .collection(`${collection}`)
      .doc(`${documentID}`)
      .delete();
  }

  getStorageKey(key: string): any {
      return JSON.parse(this.sessionStorage.getItem(key));
  }

  createStorageKey(key: string, value: any): any {
      this.sessionStorage.setItem(key, JSON.stringify(value));
  }

  deleteStorageKey(key: string): any {
    this.sessionStorage.removeItem(key);
  }

  updatingStaticData(document: any) {
    if (this.getStorageKey("user")["role"] == 'admin') {
      document.isEdit = true;
    }
  }

  updateStaticData(document: any, documentID: string) {
    console.log(document, documentID)
    delete document["documentID"];
    delete document["isEdit"];
    this.updateFirestoreDocument('static', documentID, document);
  }
}
