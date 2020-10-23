import { Component, OnInit } from '@angular/core';
import {CountryQuizService} from '../services/country-quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private countriesService: CountryQuizService) { }

  answers: string[];
  letters: string[] = ['A', 'B', 'C', 'D'];
  question: string;
  city: string;
  countries: string[];
  correctAnswer: string;

  ngOnInit(): void {
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
      this.city = '';
      this.city = observer;
      this.correctAnswer = country;
      console.log(this.correctAnswer);
      console.log(this.city);
      this.question = `${this.city} is the capital of`;

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


}
