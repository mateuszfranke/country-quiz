import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() answer: string;
  @Input() letter: string;
  correctAnswer: boolean;

  ngClassCorrect: string = '';
  ngClassInCorrect: string = '';

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {

  }

  onAnswerCheck(): void{
    this.ngClassInCorrect = 'incorrect-answer';
    this.ngClassCorrect = 'correct-answer';
    this.answerService.answerSubject.subscribe(observer => {

      this.correctAnswer = false;
      observer.forEach(x => {
        if (x.name === this.answer )
        {
          // console.log(`${x.name} is ${x.isCorrect}`);
          this.correctAnswer = x.isCorrect;
        }
      });
    });
      // console.log(`${this.answer} is ${this.correctAnswer}`);
  }
  ngOnChanges(): void{}

}
