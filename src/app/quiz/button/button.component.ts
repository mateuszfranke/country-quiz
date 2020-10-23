import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer.service';
import {observable} from 'rxjs';
import {log} from 'util';

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

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.answerService.answerSubject.subscribe(response => {

      if (response === this.answer)
      {
        console.log('should be red' +  response);
        this.isRed = true;
      }

      if (this.answer === this.answerService.correct)
      {
        console.log(`Correct answer is ${this.answer}`);
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
