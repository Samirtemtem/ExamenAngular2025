import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Match } from '../match';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-matchs',
  template: `
    <div class="container">
      <div class="matches-list">
        <h2>Liste des Matchs</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Lieu</th>
              <th>Équipe A</th>
              <th>Score</th>
              <th>Équipe B</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let match of matches">
              <td>{{match.date}}</td>
              <td>{{match.heure}}</td>
              <td>{{match.lieu}}</td>
              <td>{{match.EquipeA.nom}}</td>
              <td>{{match.score.EquipeA}} - {{match.score.EquipeB}}</td>
              <td>{{match.EquipeB.nom}}</td>
              <td>
                <button (click)="modifierScore(match.id)">Modifier score</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="update-form" *ngIf="router.url.includes('modifier-score')">
        <router-outlet></router-outlet>
      </div>
    </div>

    <style>
      .container {
        display: flex;
        gap: 20px;
        padding: 20px;
      }

      .matches-list {
        flex: 1;
      }

      .update-form {
        flex: 1;
        max-width: 500px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
    </style>
  `
})
export class ListeMatchsComponent implements OnInit {
  matches: Match[] = [];

  constructor(
    private consumerService: ConsumerService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.consumerService.get<Match[]>('matchs').subscribe(
      (data) => {
        this.matches = data;
      }
    );
  }

  modifierScore(matchId: string) {
    this.router.navigate(['modifier-score', matchId], { relativeTo: this.route });
  }
}
