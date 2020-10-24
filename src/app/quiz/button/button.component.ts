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

  constructor(private answerService: AnswerService,
              private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.answerService.answerSubject.subscribe(response => {

      if (response === this.answer)
      {
        this.isRed = true;
      }
      if (this.answer === this.answerService.correct)
      {
        this.correctAnswer = true;
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
