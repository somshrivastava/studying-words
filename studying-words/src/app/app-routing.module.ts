import { RecordsComponent } from './records/records.component';
import { StudyComponent } from './study/study.component';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {path: '', component: ManageComponent},
  {path: 'study', component: StudyComponent},
  {path: 'records', component: RecordsComponent},
  {path: ':collection', component: ManageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
