import { Router } from '@angular/router';
import { CUDDI } from '../../models/cuddi.model';
import { Column } from './../../models/column.model';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'som-table',
  templateUrl: './som-table.component.html',
  styleUrls: ['./som-table.component.scss']
})

export class SomTableComponent implements OnInit {
  @Input() tableLength: string;
  @Input() title: string;
  @Input() database: string;
  @Input() columns: Column[];
  @Input() cuddi: CUDDI;
  @ViewChild('csvReader') csvReader: any;
  data: any[] = [];
  newData: {} = {};
  adding: boolean = false;
  selectedFileName: string = 'Choose a file to import!';
  selectedFile: any;

  constructor (private dataService: DataService, private router: Router) { }

  ngOnInit() { 
    this.getTableData();
  }

  filteringText(filterText, column) {
    var filteredOptionsLength = column.options.filter(it => {
        return it[column.optionKey].toLocaleLowerCase().includes(filterText);
      }).length
    if (filteredOptionsLength < 6 && filteredOptionsLength != 0) {
      column.autoCompleteDisplay = true;
    } else {
      column.autoCompleteDisplay = false;
    }
  }

  selectOption(option, column) {
    this.newData[column.key] = option[column.optionKey];
    column.autoCompleteDisplay = false;
  }

  importCSVData() {
    this.selectedFile = this.csvReader.nativeElement.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      var lines = fileReader.result.toString().split('\n');
        for(var line = 0; line < lines.length; line++){
          this.columns.forEach(column => {
            this.newData[column.key] = lines[line].split(',')[this.columns.indexOf(column)];
          })
          this.dataService.createFirestoreDocument(`${this.database}`, this.newData);
        }
    }
    fileReader.readAsText(this.selectedFile);
    this.selectedFileName = 'Choose a file to import!';
  }

  cleanRowModel() {
    this.columns.forEach(column => {
      this.newData[`${column.key}`] = null;
    })
  }

  getTableData() {
    this.dataService
      .getFirestoreCollection(`${this.database}`)
      .subscribe(
        collection => {
          this.data = collection.map(
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

  createTableData() {
    this.dataService.createFirestoreDocument(`${this.database}`, this.newData);
    this.cleanRowModel();
    this.adding = false;
  }

  updatingTableData(document) {
    if (this.cuddi.update == true) {
      document.isEdit = true;
    }
  }

  updateTableData(document) {
    var documentID = document.documentID;
    delete document.documentID;
    delete document.isEdit;
    this.dataService.updateFirestoreDocument(`${this.database}`, documentID, document)
  }

  deleteTableData(document) {
    this.dataService.deleteFirestoreDocument(`${this.database}`, document.documentID)
  }

  deleteAll() {
    this.data.forEach(
      row => {
        this.deleteTableData(row);
      }
    )
  }

  navigateUser(column, row) {
    if (column['navigateOnClick']) {
      column['navigationPathKey'].forEach(
        key => {
          column['navigationPath'].push(row[key]);
        }
      )
      this.router.navigate(column['navigationPath']);
      column['navigationPathKey'].forEach(
        key => {
          column['navigationPath'].splice(column['navigationPath'].indexOf(key), 1)
        }
      )
    }
  }
}
