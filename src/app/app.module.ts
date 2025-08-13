import { DataService } from './services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SomTableComponent } from './components/som-table/som-table.component';
import { StudyComponent } from './components/study/study.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SomTableComponent,
    StudyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, ''),
  ],
  providers: [AngularFirestore, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
