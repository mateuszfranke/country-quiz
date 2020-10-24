import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScoreService {
  private scoreCount: number;
  private isGameActive: boolean;
  randomize: Subject<any> = new Subject<any>();

  constructor() {
    this.scoreCount = 0;
    this.isGameActive = true;
  }

  AddPoint(): void{
    this.scoreCount += 1;
  }
  GameFinished(): void{
    this.isGameActive = false;
  }
  StartGame(): void{
    this.scoreCount = 0;
    this.isGameActive = true;
  }

  GetScore(): number {
    return this.scoreCount;
  }

  IsGameActive(): boolean{
    return this.isGameActive;
  }

}
