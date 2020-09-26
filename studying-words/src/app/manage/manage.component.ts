import { SessionStorageService } from './../storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

export interface Word {
  name: string,
  isCorrect: boolean
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})

export class ManageComponent implements OnInit {
  database;
  storageName;
  rowModel: Word = {
    name: '',
    isCorrect: false
  }
  allCollections = [];

  createCollection: boolean;
  newCollectionName: string = '';
  collectionCreated: boolean;
  
  deleteEditCollections: boolean;

  constructor(private db: AngularFirestore, private sessionStorageService: SessionStorageService) { 
  }

  ngOnInit() {
  }

  getCollections() {
    this.db.collection('studying-words').doc('studying-words').collection('allCollections').snapshotChanges()
      .subscribe(actionArray => {
        this.allCollections = actionArray.map(collection => {
          return collection.payload.doc.data()["name"];
        })
        console.log(this.allCollections);
      })
      this.deleteEditCollections = true;
  }

  addCollection() {
    this.database = this.db.collection('studying-words').doc('studying-words').collection(`${this.newCollectionName}`);
    this.storageName = `${this.newCollectionName}`;
    this.allCollections.push(this.newCollectionName);
    this.db.collection('studying-words').doc('studying-words').collection('allCollections').doc(`${this.newCollectionName}`).set({name: this.newCollectionName});
    this.collectionCreated = true;
    this.createCollection = false;
    this.newCollectionName = '';
  }

  deleteCollection(name) {
    this.db.collection('studying-words').doc('studying-words').collection(`${name}`).snapshotChanges()
      .subscribe(actionArray => {
        actionArray.forEach(collection => {
          console.log(collection.payload.doc.data()["name"])
          this.db.collection('studying-words').doc('studying-words').collection(`${name}`).doc(`${collection.payload.doc.data()["name"]}`).delete();
        })
      })
    this.sessionStorageService.remove
  }

  goBack() {
    this.collectionCreated = true;
    this.createCollection = false;
    this.newCollectionName = '';
  }
}
