import { Equipe } from "./equipe";
import { Score } from "./score";

export class Match {
    id!: string;  // Changed from number to string
    date!: string;
    heure!: string;
    lieu!: string;
    EquipeA: Equipe = new Equipe();
    EquipeB: Equipe = new Equipe();
    score: Score = new Score();
}
