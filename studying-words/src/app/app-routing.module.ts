import { HomeComponent } from './home/home.component';
import { RecordComponent } from './record/record.component';
import { RecordsComponent } from './records/records.component';
import { StudyComponent } from './study/study.component';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {path: '', component: HomeComponent},
  {path: 'manage', component: ManageComponent},
  {path: 'study', component: StudyComponent},
  {path: 'records', component: RecordsComponent},
  {path: 'manage/:collection', component: ManageComponent},
  {path: 'records/:record', component: RecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
