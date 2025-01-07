import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { ListeMatchsComponent } from './liste-matchs/liste-matchs.component';
import { MatchComponent } from './match/match.component';
import { UpdateScoreMatchComponent } from './update-score-match/update-score-match.component';

const routes: Routes = [
  {
    path: 'equipes', component: ListeEquipesComponent
  },
  {
    path: 'matches', 
    component: ListeMatchsComponent,
    children: [
      {
        path: 'modifier-score/:id',
        component: UpdateScoreMatchComponent
      }
    ]
  },
  {
    path: 'add', component: MatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
