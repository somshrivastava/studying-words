import { SessionStorageService } from './../storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  allRecords = [];
  
  constructor(private db: AngularFirestore, private sessionStorageService: SessionStorageService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.getAllRecords();
  }

  getAllRecords() {
    this.db.collection('studying-words').doc('studying-words').collection('study-records').snapshotChanges()
      .subscribe(actionArray => {
        this.allRecords = actionArray.map(record => {
          return record.payload.doc.data();
        })   
      this.sessionStorageService.set('study-records', this.allRecords);
      })
  }

  deleteRecord(record) {
    this.db.collection('studying-words').doc('studying-words').collection('study-records').doc(`${this.allRecords[this.allRecords.indexOf(record)]["name"]}`).delete();
    this.allRecords.splice(this.allRecords.indexOf(record), 1);
    this.sessionStorageService.set('study-records', this.allRecords)
  }
}
