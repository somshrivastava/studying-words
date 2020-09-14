import { RoundStatsComponent } from './round-stats/round-stats.component';
import { WordsComponent } from './words/words.component';
import { ManageComponent } from './manage/manage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: 'manage', component: ManageComponent},
    {path: 'words', component: WordsComponent},
    {path: 'round-stats', component: RoundStatsComponent}
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }