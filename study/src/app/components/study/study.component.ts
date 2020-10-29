import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  collections: any[] = [];
  collectionName: string;
  collectionID: any;
  collection: any[] = [];
  selectedWord: any = {
    documentID: '',
    name: '',
    accuracy: false
  };
  studyFinished: boolean;
  studyResults: any;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.studyCollection();
  }

  studyCollection() {
      this.activatedRoute
        .params
        .subscribe(
          params => {
            this.collectionName = params.collection;
            this.dataService
              .getFirestoreCollection('collections')
              .subscribe(
                collection => {
                  collection.forEach(
                    document => {
                      if (document.payload.doc.data().name == this.collectionName) {
                        this.collectionID = document.payload.doc.id;
                      }
                    }
                  )
                  this.dataService
                    .getFirestoreCollection(`collections/${this.collectionID}/words`)
                    .subscribe(
                      collection => {
                        this.collection = collection.map(
                          document => {
                            return {
                              documentID: document.payload.doc.id,
                              ...document.payload.doc.data()
                            }
                          }
                        )
                        this.selectedWord = this.collection[0];
                      }
                    )
                }
              )
          }
        )
    }

  nextWord(index) {
    this.selectedWord = this.collection[index];
  }

  studyWord(accuracy, selectedWord) {
     if (this.collection.indexOf(selectedWord) == this.collection.length - 1) {
      if (accuracy == 'true') {
        this.collection[this.collection.indexOf(selectedWord)].accuracy = true;
      } else {
        this.collection[this.collection.indexOf(selectedWord)].accuracy = false;
      }
      this.studyFinished = true;
      setTimeout(() => {
        var correctNumber: number = 0;
        var incorrectNumber: number = 0;
        this.studyFinished = false;
        this.router.navigate(['dashboard', 'study']);
        this.collection.forEach(
          word => {
            if (word.accuracy == false) {
              incorrectNumber += 1;
            } else {
              correctNumber += 1;
            }
          }
        )
        this.dataService.createFirestoreDocumentWithID('results', `${this.dataService.getTimestamp().replace(new RegExp('/', 'g'), '&')}`, {collectionName: this.collectionName, correct: correctNumber, incorrect: incorrectNumber, timestamp: this.dataService.getTimestamp()});
        this.collection.forEach(
          word => {
            this.dataService.createFirestoreDocument(`results/${this.dataService.getTimestamp().replace(new RegExp('/', 'g'), '&')}/resultsData`, word)
          }
        )
      }, 5000);
    } else {
      if (accuracy == 'true') {
        this.collection[this.collection.indexOf(selectedWord)].accuracy = true;
      } else {
        this.collection[this.collection.indexOf(selectedWord)].accuracy = false;
      }
      this.nextWord(this.collection.indexOf(selectedWord) + 1);
    }
  }
}
