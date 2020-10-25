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
  flagQuestion = `Which country does this flag belong to?`;
  isFlagQuestion: boolean;
  flagUrl: string;

  ngOnInit(): void {
    this.scoreService.StartGame();
    this.answers = [];
    this.countriesService.getCountries().subscribe(observer => {
      this.countries = [];
      this.countries = observer;
      this.randomQuestion();

    });
    this.scoreService.randomize.subscribe(observer => {
      this.randomQuestion();
      this.isQuestionAnswered = false;
    });

  }

  randomQuestion(): void{
    this.get4RandomCountries();

    this.prepareQuestionAndAnswer();
  }

  prepareQuestionAndAnswer(): void{
    const max: number = (this.answers.length - 1);
    const min = 0;
      let country = this.answers[Math.floor(Math.random() * (max - min) + min)];
      this.countriesService.getCapitalCityFromCountry(country).subscribe(observer => {
      this.correctAnswer = country;
      this.isFlagQuestion = this.randomizeCategory();
      if (!this.isFlagQuestion) {
        this.question = `${observer.capital} is the capital of`;
      }
      else {
        this.question = this.flagQuestion;
        this.flagUrl = observer.flag;
      }
    });
  }
  randomizeCategory(): boolean{
    const randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
    return randomNumber % 2 === 1;
  }
  get4RandomCountries(): void{
    const arr: string[] = [];
    const max: number = (this.countries.length - 1);
    const min = 0;
    let uniqueIndex: number[] = [];
    let x = Math.floor(Math.random() * (max - min) + min);
    let isUnique = false;
    while (!isUnique){
      for (let i = 0; i < 4; i++)
      {
        const randomIndex = Math.floor(Math.random() * (max - min) + min);
        uniqueIndex.push(randomIndex);
      }
      const distinctArray = uniqueIndex.filter((n, i) => uniqueIndex.indexOf(n) === i);
      if (distinctArray.length === 4){
        isUnique = true;
      }else {
        uniqueIndex = [];
      }
    }
    for (let i = 0; i < 4; i++)
    {
      arr.push(this.countries[uniqueIndex[i]]);
    }
    this.answers = arr;
  }
  onCheckAnswer(answer: string): void {
    if (!this.isQuestionAnswered)
    {
      this.tempAnswer = answer;
      this.answerService.correct = this.correctAnswer;
      this.isQuestionAnswered = true;
      this.answerService.answerSubject.next(answer);
    }

  }
  onNext(): void{
    if (this.correctAnswer === this.tempAnswer )
    {
      this.scoreService.AddPoint();
      this.isQuestionAnswered = false;
      this.randomQuestion();
    }else{
      this.scoreService.GameFinished();
    }
  }


}
