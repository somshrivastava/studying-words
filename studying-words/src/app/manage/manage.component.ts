import { SessionStorageService } from './../storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  objectFields = ["name"];
  allCollections = [];

  createCollection: boolean;
  newCollectionName: string = '';
  collectionCreated: boolean;
  
  deleteEditCollections: boolean;

  constructor(private db: AngularFirestore, private sessionStorageService: SessionStorageService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.getAllCollections();
    this.route.params.subscribe(params => {
      if (params["collection"] != undefined) {
        this.goToCollection(params["collection"]);
      }
    })
  }

  goToCollection(collection) {
    this.database = this.db.collection('studying-words').doc('studying-words').collection(`${collection}`);
    this.storageName = `${collection}`;
    this.collectionCreated = true;
    this.createCollection = false;
    this.newCollectionName = '';
  }

  getAllCollections() {
    this.db.collection('studying-words').doc('studying-words').collection('allCollections').snapshotChanges()
      .subscribe(actionArray => {
        this.allCollections = actionArray.map(collection => {
          return collection.payload.doc.data()["name"];
        })   
      })
    this.deleteEditCollections = true;
  }

  goBack() {
    this.database = null;
    this.storageName = '';
    this.collectionCreated = false;
    this.createCollection = false;
    this.newCollectionName = '';
  }
}
