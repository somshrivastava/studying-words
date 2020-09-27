import { SessionStorageService } from './../storage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  record;
  records;
  routeParam;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeParam = params["record"];
    })
    this.getData();
  }

  getData() {
    this.db.collection('studying-words').doc('studying-words').collection('study-records').snapshotChanges()
      .subscribe(actionArray => {
        actionArray.forEach(item => {
          if (item.payload.doc.data()["name"] == this.routeParam) {
            this.record = item.payload.doc.data()
            this.records = item.payload.doc.data()["records"]
          }
        })
        console.log(this.records)
        console.log('Firebase');
      })
  }
}
