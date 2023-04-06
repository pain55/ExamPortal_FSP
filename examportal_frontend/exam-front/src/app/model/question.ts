export interface Question {
  questionId:number;
  questionContent:String;
  option1:String;
  option2:String;
  option3:String;
  option4:String;
  answer:String;
  quiz:{
    quizId:number;
  }
}
