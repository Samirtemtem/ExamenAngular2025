import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../consumer.service';
import { Match } from '../match';

@Component({
  selector: 'app-update-score-match',
  templateUrl: './update-score-match.component.html',
  styleUrls: ['./update-score-match.component.css']
})
export class UpdateScoreMatchComponent implements OnInit {
  match: Match | null = null;
  scoreForm: FormGroup;
  matchId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consumerService: ConsumerService,
    private fb: FormBuilder
  ) {
    this.scoreForm = this.fb.group({
      scoreEquipeA: ['', [Validators.required, Validators.min(0)]],
      scoreEquipeB: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = params['id'];
      if (this.matchId) {
        this.loadMatch();
      } else {
        this.router.navigate(['/matches']);
      }
    });
  }

  loadMatch() {
    this.consumerService.get<Match>(`matchs/${this.matchId}`).subscribe(
      (data) => {
        this.match = data;
        if (this.match) {
          this.scoreForm.patchValue({
            scoreEquipeA: this.match.score.EquipeA,
            scoreEquipeB: this.match.score.EquipeB
          });
        }
      },
      (error) => {
        console.error('Error loading match:', error);
        this.router.navigate(['/matches']);
      }
    );
  }

  onSubmit() {
    if (this.scoreForm.valid && this.match) {
      const updatedMatch = { ...this.match };
      updatedMatch.score = {
        EquipeA: this.scoreForm.value.scoreEquipeA,
        EquipeB: this.scoreForm.value.scoreEquipeB
      };

      this.consumerService.update<Match>('matchs', updatedMatch, this.matchId).subscribe(
        () => {
          this.router.navigate(['/matches']);
        },
        (error) => {
          console.error('Error updating match:', error);
        }
      );
    }
  }

  hasError(field: string, errorType: string): boolean {
    return this.scoreForm.get(field)?.errors?.[errorType] && 
           this.scoreForm.get(field)?.touched || false;
  }

  getErrorMessage(field: string): string {
    const control = this.scoreForm.get(field);
    
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return `Le score est obligatoire`;
    }
    if (control.errors['min']) {
      return `Le score doit être positif`;
    }
    
    return '';
  }
}
