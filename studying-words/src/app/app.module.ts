import { SessionStorageService } from './local-storage.service';
import { AppRoutingModule } from './app-routing.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';
import { RoundStatsComponent } from './round-stats/round-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    ManageComponent,
    RoundStatsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, ''),
    AppRoutingModule
  ],
  providers: [ AngularFirestore, SessionStorageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
