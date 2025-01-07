import { Component, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Equipe } from '../equipe';

@Component({
  selector: 'app-liste-equipes',
  template: `
    <h2>Liste des équipes</h2>
    <ul>
      <li *ngFor="let equipe of equipes">
        {{ equipe.nom }} ({{ equipe.natif }})
      </li>
    </ul>
  `,
  styleUrls: ['./liste-equipes.component.css']
})
export class ListeEquipesComponent implements OnInit {
  equipes: Equipe[] = [];

  constructor(private consumerService: ConsumerService) {}

  ngOnInit(): void {
    this.consumerService.get<Equipe[]>('equipes').subscribe(
      (data) => {
        this.equipes = data;
      }
    );
  }
}
