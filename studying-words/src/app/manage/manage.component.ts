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
  wordsCollection: string = '';
  constructor(private wordsService: WordsService) { }

  ngOnInit() { }

  selectCollection(collection) {
    this.wordsCollection = collection;
    this.getWords();
  }

  getWords() {
    console.log(this.wordsCollection)
    this.wordsService.getData(`${this.wordsCollection}`).snapshotChanges().subscribe(actionArray => {
      this.words = actionArray.map(item => {
        return item.payload.doc.data() as Word
      })
    });
  }

  addWord() {
    this.word['word'].split(' ').forEach(word => {
      this.word = {
        word: word,
        isCorrect: null
      }
      this.wordsService.addData(`${this.wordsCollection}`, this.word)
    });
    this.word = {
      word: '',
      isCorrect: null
    }
  }

  deleteWord(word) {
    this.wordsService.deleteData(`${this.wordsCollection}`, word)
  }
}
