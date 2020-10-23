import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnswerService {
   correct: string;
   answerSubject: Subject<string> = new Subject<string>();
}
