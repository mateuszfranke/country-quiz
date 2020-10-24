import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import {HttpClientModule} from '@angular/common/http';
import { ButtonComponent } from './quiz/button/button.component';
import { ResultComponent } from './quiz/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    QuizComponent,
    ButtonComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
