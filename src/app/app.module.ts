import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListeEquipesComponent } from './liste-equipes/liste-equipes.component';
import { ListeMatchsComponent } from './liste-matchs/liste-matchs.component';
import { MatchComponent } from './match/match.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ConsumerService } from './consumer.service';
import { UpdateScoreMatchComponent } from './update-score-match/update-score-match.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListeMatchsComponent,
    MatchComponent,
    HomeComponent,
    FooterComponent,
    ListeEquipesComponent,
    UpdateScoreMatchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ConsumerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
