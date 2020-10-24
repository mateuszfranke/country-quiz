import { Component, OnInit } from '@angular/core';
import {CountryQuizService} from '../services/country-quiz.service';
import {AnswerService} from '../services/answer.service';
import {ScoreService} from '../services/score.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
    private countriesService: CountryQuizService,
    private answerService: AnswerService,
    public scoreService: ScoreService
    ) { }

  answers: string[];
  letters: string[] = ['A', 'B', 'C', 'D'];
  question: string;
  countries: string[];
  correctAnswer: string;
  isQuestionAnswered: boolean;
  tempAnswer: string;

  ngOnInit(): void {
    this.scoreService.StartGame();
    this.answers = [];
    this.countriesService.getCountries().subscribe(observer => {
      this.countries = [];
      this.countries = observer;
      this.get4RandomCountries();
      this.prepareQuestionAndAnswer();
    });

  }

  prepareQuestionAndAnswer(): void{
    const max: number = (this.answers.length - 1);
    const min = 0;
      let country = this.answers[Math.floor(Math.random() * (max - min) + min)];
      this.countriesService.getCapitalCityFromCountry(country).subscribe(observer => {
      this.correctAnswer = country;
      this.question = `${observer} is the capital of`;
    });
  }

  get4RandomCountries(): void{
    const arr: string[] = [];
    const max: number = (this.countries.length - 1);
    const min = 0;
    for (let i = 0; i < 4; i++)
    {
      arr.push(this.countries[Math.floor(Math.random() * (max - min) + min)]);
    }
    this.answers = arr;
  }

  onCheckAnswer(answer: string): void {
    this.tempAnswer = answer;
    this.answerService.correct = this.correctAnswer;
    this.isQuestionAnswered = true;
    this.answerService.answerSubject.next(answer);

  }
  onNext(): void{
    if (this.correctAnswer === this.tempAnswer )
    {
      this.scoreService.AddPoint();
    }else{
      this.scoreService.GameFinished();
    }
  }


}
