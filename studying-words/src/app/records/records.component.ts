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
      })
  }
}
