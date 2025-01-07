import { Component } from '@angular/core';
import { Equipe } from '../equipe';
import { Score } from '../score';
import { Match } from '../match';
import { ConsumerService } from '../consumer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  Match: Match = new Match()
  MatchForm: Match = new Match()
  equipes: Equipe[] = []
  fg = new FormGroup({
    date: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required]),
    lieu: new FormControl('', [Validators.required]),
    EquipeA: new FormControl('', [Validators.required]),
    EquipeB: new FormControl('', [Validators.required])
  }, { updateOn: 'blur' })

  getErrorMessage(field: string): string {
    const control = this.fg.get(field);
    if (control?.hasError('required')) {
      return `${field} est requis`;
    }
    if (field === 'heure' && control?.hasError('minlength')) {
      return `${field} doit avoir au moins 10 caractères`;
    }
    return '';
  }
  constructor(private consumerService: ConsumerService) {}
  ngOnInit(): void {
    this.consumerService.get<Equipe[]>('equipes').subscribe(
      (data) => {
        this.equipes = data;
      }
    );
  }
  addMatch(m: any) {
    let match = new Match()
    match.date = m.date
    match.heure = m.heure
    match.lieu = m.lieu
    console.log(m); 
    match.EquipeA = this.equipes.find(e => e.id == m.EquipeA)!
    match.EquipeB = this.equipes.find(e => e.id == m.EquipeB)!
    console.log(match.EquipeA);
    if (match.date <= Date.now().toString()) {
      alert('Date incorecte');
      return;
    }
    if (match.EquipeA.id == match.EquipeB.id) {
      alert('Equipe A et B doivent etre differentes')
      return;
    }
    if (match.EquipeA.natif != match.EquipeB.natif) {
      alert('Equipe A et B doivent etre de la meme natif')
      return;
    }
    let score: Score = new Score()
    score.EquipeA = 0
    score.EquipeB = 0
    match.score = score
    this.consumerService.add<Match>('matchs', match).subscribe(
      (data) => {
        this.Match = data;
      }
    );
  }


}
