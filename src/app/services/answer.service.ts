import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AnswerModel} from '../model/answer.model';

@Injectable({providedIn: 'root'})
export class AnswerService {

   answerSubject: Subject<AnswerModel[]> = new Subject<AnswerModel[]>();

}
