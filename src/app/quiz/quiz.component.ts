import { Component, OnInit } from '@angular/core';
import { Questions } from '../questions';
import { HttpClient } from '@angular/common/http';
import { Answers } from '../answers';
import { AnswerReview } from '../answer-review';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(public http: HttpClient) {}
  score: number = 0;
  questionsAnswered: number = 0;
  questions: Array<Questions> = [];
  answers: Array<Answers> = [];
  selectedAnswers = new Map();
  answerReviews: Array<AnswerReview> = [];

  ngOnInit(): void {
    this.http.get('/assets/quiz.json').subscribe(
      (result: any) => (this.questions = result.questions),
      (error) => console.log(error),
      () => console.log(this.questions)
    );

    this.http.get('/assets/answers.json').subscribe(
      (result: any) => (this.answers = result.answers),
      (error) => console.log(error),
      () => console.log(this.answers)
    );
  }

  correctAns(qnum: number, ans: string) {
    let userResponse = new AnswerReview(qnum, ans, this.answers[qnum - 1].ans);
    this.answerReviews.push(userResponse);
  }

  gradeTest() {
    console.log('Test Grading Started');
    this.questionsAnswered = this.answerReviews.length;
    
    for (let review of this.answerReviews){
      if (review.userAns == review.correctAns){
        this.score++;
      }
    }
  }
}
