import { AngularFirestore } from '@angular/fire/firestore';
import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'round-stats',
  templateUrl: './round-stats.component.html',
  styleUrls: ['./round-stats.component.scss']
})
export class RoundStatsComponent implements OnInit {
  recordedStats = [];

  constructor(private localStorageService: LocalStorageService, private db: AngularFirestore) { }

  ngOnInit() { this.getRecordedStats(); }

  getRecordedStats() {
    if (this.localStorageService.get('roundStats') == null || []) {
      this.db.collection('roundStats').snapshotChanges()
      .subscribe(actionArray => {
        this.recordedStats = actionArray.map(item => {
          return Object.assign({'isShown': false},  item.payload.doc.data());
        })
      this.recordedStats.forEach(stat => {
        stat['stats'].forEach(word =>  {
          word = Object.assign({'isShown': false}, word);
        })
      })
      this.localStorageService.set('roundStats', this.recordedStats);
      });
    } else {
      this.recordedStats = this.localStorageService.get('roundStats');
    }
  }
}
