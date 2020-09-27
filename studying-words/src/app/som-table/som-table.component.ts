import { SessionStorageService } from './../storage.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'som-table',
  templateUrl: './som-table.component.html',
  styleUrls: ['./som-table.component.scss']
})

export class SomTableComponent implements OnInit {
  @Input() objectFields;
  @Input() allData;
  @Input() database;
  @Input() storageName;
  @Input() rowModel;
  @Input() add: boolean;
  @Input() edit: boolean;
  @Input() delete: boolean;
  data = [];
  editName = '';
  isAdd: boolean;

  constructor( private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    console.log(this.allData)
    if (this.allData == undefined) {
      this.getData();
      console.log('Using Database')
    } else {
      this.data = this.allData;
      console.log('Not Using Database')
    }
  }

  getData() {
    if (this.sessionStorageService.get(`${this.storageName}`) == null || this.sessionStorageService.get(`${this.storageName}`) == []) {
      this.database.snapshotChanges()
        .subscribe(actionArray => {
          this.data = actionArray.map(item => {
            return item.payload.doc.data()
          })
          this.sessionStorageService.set(`${this.storageName}`, this.data);
          console.log('Firebase');
        })
    } else {
      this.data = this.sessionStorageService.get(`${this.storageName}`);
      console.log('Session Storage')
    }
  }

  addRow() {
    this.data.push(this.rowModel);
    this.sessionStorageService.set(`${this.storageName}`, this.data);
    this.database.doc(`${this.rowModel["name"]}`).set(this.rowModel);
    this.rowModel = {
      name: '',
      isCorrect: null
    }
  }

  editRow(row) {
    row["isEdit"] = false;
    delete row["isEdit"];
    this.sessionStorageService.set(`${this.storageName}`, this.data);
    this.database.doc(`${this.editName}`).delete();
    this.database.doc(`${row["name"]}`).set(row);
  }

  editingRow(row) {
    if (this.edit == true) {
      row["isEdit"] = true;
      this.editName = row["name"];
    }
  }

  deleteRow(row) {
    this.data.splice(this.data.indexOf(row), 1);
    this.sessionStorageService.set(`${this.storageName}`, this.data);
    this.database.doc(`${row.name}`).delete();
  }
}
