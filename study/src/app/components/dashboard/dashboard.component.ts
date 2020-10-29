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
  tables: string[] = ['collections'];
  selectedTable: string = '';
  collections: any[] = [];
  collectionsDatabase: string;
  collectionsCudi: CUDI;
  collectionsColumns: Column[];
  collectionCudi: CUDI;
  collectionColumns: Column[];

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
    this.collectionsDatabase = "collections";
    this.collectionsCudi = {
      create: true,
      update: true,
      delete: true,
      import: true
    };
    this.collectionsColumns = [
      {name: 'Name', key: 'name', type: 'text', edit: false, navigateOnClick: true, navigationPath: ['dashboard'], navigationPathKey: 'name'}
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
    this.activeRoute.params.subscribe(table => {
        this.selectedTable = table.table;
        console.log(this.selectedTable)
        this.activeRoute.url.subscribe(url => {
          if (url.length == 1) {
            this.router.navigate(['dashboard', this.tables[0]])
          }
        })
      })
  }
}
