import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer.service';
import {ScoreService} from '../../services/score.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() answer: string;
  @Input() letter: string;

  correctAnswer: boolean;
  isRed: boolean;
  height: number;

  constructor(private answerService: AnswerService,
              private scoreService: ScoreService) { }

  ngOnInit(): void {
    if (this.answer.length > 35)
    {
      this.height = 80;
    }
    else{
      this.height = 40;
    }
    this.answerService.answerSubject.subscribe(response => {
      this.isRed = false;
      if (response === this.answer)
      {
        this.isRed = true;
      }
      if (this.answer === this.answerService.correct)
      {
        this.correctAnswer = true;
        this.isRed = false;
      }
      else {
        this.correctAnswer = false;
      }
    });
  }

  getClass(){
    let cls = '';
    if (this.correctAnswer)
    {
      cls = 'correct-answer';
    }else if (this.isRed)
    {
      cls = 'incorrect-answer';

    }else{
      cls = 'none';
    }
    return cls;
  }

  ngOnChanges(): void{}

}
