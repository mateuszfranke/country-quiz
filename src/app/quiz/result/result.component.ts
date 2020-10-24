import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../../services/score.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  score: number;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.score = this.scoreService.GetScore();
  }

  onTryAgain(){
    this.scoreService.StartGame();
  }

}
