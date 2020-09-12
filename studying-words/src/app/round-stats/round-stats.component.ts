import { AngularFirestore } from '@angular/fire/firestore';
import { SessionStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'round-stats',
  templateUrl: './round-stats.component.html',
  styleUrls: ['./round-stats.component.scss']
})
export class RoundStatsComponent implements OnInit {
  recordedStats = [];

  constructor(private sessionStorageService: SessionStorageService, private db: AngularFirestore) { }

  ngOnInit() { this.getRecordedStats(); }

  getRecordedStats() {
    if (this.sessionStorageService.get('roundStats') == null || []) {
      this.db.collection('roundStats').snapshotChanges()
      .subscribe(actionArray => {
        this.recordedStats = actionArray.map(item => {
          return Object.assign({'isShown': false},  item.payload.doc.data());
        })
      this.sessionStorageService.set('roundStats', this.recordedStats);
      });
    } else {
      this.recordedStats = this.sessionStorageService.get('roundStats');
    }
  }
}
