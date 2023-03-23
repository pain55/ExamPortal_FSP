export interface Quiz {
  quizId:number;
  quizTitle:String;
  quizDescription:String;
  maxMarks:number;
  totalNumberOfQuestions:number;
  isActive:boolean;
  category:{
    categoryId: number;
  }
}
