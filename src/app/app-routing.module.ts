import { StudyComponent } from './components/study/study.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/:table', component: DashboardComponent},
  {path: 'dashboard/study/:collection', component: StudyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
