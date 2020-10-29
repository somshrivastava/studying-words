import { DataService } from './../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from '../../models/column.model';
import { CUDI } from '../../models/cudi.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  showOptions: boolean = false;
  tables: string[] = ['collections', 'study', 'results'];
  selectedTable: string = '';
  collections: any[] = [];
  collectionsTitle: string = 'Select A Collection Of Words To Modify Or View';
  collectionsDatabase: string = 'collections';
  collectionsCudi: CUDI;
  collectionsColumns: Column[];
  collectionCudi: CUDI;
  collectionColumns: Column[];
  studyTitle: string = 'Select A Collection Of Words To Study';
  studyDatabase: string = 'collections';
  studyCudi: CUDI;
  studyColumns: Column[];
  results: any[] = [];
  resultsTitle: string = 'Select A Past Study Result To Review'
  resultsDatabase: string = 'results';
  resultsColumns: Column[];
  resultsCudi: CUDI;
  resultColumns: Column[];
  resultCudi: CUDI;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

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
          this.collections.forEach(
            document => {
              document['collectionPath'] = `collections/${document.documentID}/words`
            }
          )
        }
      )
    this.dataService
      .getFirestoreCollection('results')
      .subscribe(
        collection => {
          this.results = collection.map(
            document => {
              return {
                documentID: document.payload.doc.id,
                ...document.payload.doc.data()
              }
            }
          )
          this.results.forEach(
            document => {
              document['collectionPath'] = `results/${document.documentID.replaceAll('/', '&')}/resultsData`
            }
          )
        }
      )
      this.collectionsCudi = {
      create: true,
      update: true,
      delete: true,
      import: false
    };
    this.collectionsColumns = [
      {name: 'Name', key: 'name', type: 'text', edit: false, navigateOnClick: true, navigationPath: ['dashboard'], navigationPathKey: ['name']}
    ];
    this.collectionCudi = {
      create: true,
      update: true,
      delete: true,
      import: true
    };
    this.collectionColumns = [
      {name: 'Name', key: 'name', type: 'text', edit: false}
    ]
    this.studyCudi = {
      create: false,
      update: false,
      delete: false,
      import: false
    };
    this.studyColumns = [
      {name: 'Name', key: 'name', type: 'text', edit: false, navigateOnClick: true, navigationPath: ['dashboard', 'study'], navigationPathKey: ['name']}
    ];
    this.resultsCudi = {
      create: false,
      update: false,
      delete: true,
      import: false
    };
    this.resultsColumns = [
      {name: 'Collection Name', key: 'collectionName', type: 'text', edit: false, navigateOnClick: true, navigationPath: ['dashboard'], navigationPathKey: ['timestamp']},
      {name: 'Time Studied', key: 'timestamp', type: 'text', edit: false},
      {name: 'Correct', key: 'correct', type: 'number', edit: false},
      {name: 'Incorrect', key: 'incorrect', type: 'number', edit: false}
    ];
    this.resultCudi = {
      create: false,
      update: false,
      delete: false,
      import: false
    };
    this.resultColumns = [
      {name: 'Word', key: 'name', type: 'text', edit: false},
      {name: 'Accurate?', key: 'accuracy', type: 'text', edit: false},
    ];
    this.activeRoute.params.subscribe(table => {
        this.selectedTable = table.table;
        this.activeRoute.url.subscribe(url => {
          if (url.length == 1) {
            this.router.navigate(['dashboard', this.tables[0]])
          }
        })
      })
  }
}
