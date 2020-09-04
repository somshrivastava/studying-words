import { Word } from './../word.model';
import { WordsService } from './../words.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  words = [];
  word: Word = {
    word: '',
    isCorrect: null
  }
  showAdd: boolean;

  constructor(private wordsService: WordsService) { }

  ngOnInit() { 
    this.getWords();
   }

  getWords() {
    this.wordsService.getData('words').snapshotChanges().subscribe(actionArray => {
      this.words = actionArray.map(item => {
        return item.payload.doc.data() as Word
      })
    });
  }

  addWord() {
    this.wordsService.addData('words', this.word)
  }

  deleteWord(word) {
    this.wordsService.deleteData('words', word)
  }
}
