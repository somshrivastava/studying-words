import { environment } from './../environments/environment';
import { SessionStorageService } from './storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SomTableComponent } from './som-table/som-table.component';
import { ManageComponent } from './manage/manage.component';
import { StudyComponent } from './study/study.component';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './record/record.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SomTableComponent,
    ManageComponent,
    StudyComponent,
    RecordsComponent,
    RecordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, '')
  ],
  providers: [ AngularFirestore, SessionStorageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
