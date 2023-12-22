import { getEntry, type CollectionEntry } from "astro:content";

import { InquirerAnswers } from "./InquirerAnswers";

interface InquirerResultAnswerDTO {
  questionText: string;
  answerText: string;
  answerWeight: number;
}

type InquirerEntry = CollectionEntry<"inquirers">;

 // Определяется класс InquirerResult, который принимает два параметра: объект типа InquirerEntry для опроса и объект типа InquirerAnswers для ответов на опрос. 
export class InquirerResult {
  private constructor(
    public readonly inquirer: InquirerEntry,
    public readonly inquirerAnswers: InquirerAnswers
  ) {}

  // Определяется статический метод get(), который получает объект InquirerResult по заданному id ответов на опрос. 
  // Если объект не найден, то выбрасывается ошибка. Затем метод получает объект типа InquirerEntry для опроса по id опроса из объекта answers. 
  // Если объект не найден, то выбрасывается ошибка. Возвращается новый объект InquirerResult с полученными объектами inquirerEntry и answers.
  public static async get(answersId: string): Promise<InquirerResult> {
    const answers = InquirerAnswers.get(answersId);

    if (!answers) {
      throw new Error(`InquirerAnswers with id ${answersId} not found`);
    }

    const inquirerEntry = await getEntry("inquirers", answers.inquirerId);

    if (!inquirerEntry) {
      throw new Error(`Inquirer with id ${answers.inquirerId} not found`);
    }

    return new InquirerResult(inquirerEntry, answers);
  }

  private _answers: InquirerResultAnswerDTO[] | undefined;

  // Определяется геттер answers, который возвращает массив объектов типа InquirerResultAnswerDTO, 
  // содержащий текст вопроса, текст ответа и его вес. Если массив уже был вычислен, то он возвращается из приватного свойства _answers. 
  // Если массив еще не вычислен, то он вычисляется на основе данных опроса и ответов на опрос и сохраняется в приватное свойство _answers, а затем возвращается.
  public get answers(): InquirerResultAnswerDTO[] {
    let answers = this._answers;

    if (!answers) {
      this._answers = this.inquirer.data.questions.map((question) => {
        const answerId = this.inquirerAnswers.answers[question.id];

        const answer = question.answers.find(
          (answer) => answer.id === answerId
        )!;

        return {
          questionId: question.id, // <-- добавить вот эту строчку
          answerText: answer.text,
          questionText: question.text,
          answerWeight: answer.weight ?? 0,
        };
      });

      answers = this._answers;
    }

    return answers;
  }

  // Определяется геттер fun1234Weight, который вычисляет вес ответов на вопросы, относящиеся к категориям "Fun 1", "Fun 2", "Fun 3" и "Fun 4". 
  // Возвращается сумма весов ответов на эти вопросы.
  public get fun1234Weight(): number {
    return this.answers.reduce((fun1234Weight, answer) => {
      if (["1", "14", "27","3", "16", "29","5", "18", "31","6", "19", "32"].includes(answer.questionId)) {
        return fun1234Weight + answer.answerWeight;
      } else {
        return fun1234Weight;
      }
    }, 0);
  }
  public get fun1Weight(): number {
    return this.answers.reduce((fun1Weight, answer) => {
      if (["1", "14", "27"].includes(answer.questionId)) {
        return fun1Weight + answer.answerWeight;
      } else {
        return fun1Weight;
      }
    }, 0);
  }
  public get fun2Weight(): number {
    return this.answers.reduce(
      (fun2Weight, answer) => 
      {
      if (["3", "16", "29"].includes(answer.questionId)) {
        return fun2Weight + answer.answerWeight;
      } else {
        return fun2Weight;
      }
    }, 0);
  }
  public get fun3Weight(): number {
    return this.answers.reduce((fun3Weight, answer) => {
      if (["5", "18", "31"].includes(answer.questionId)) {
        return fun3Weight + answer.answerWeight;
      } else {
        return fun3Weight;
      }
    }, 0);
  }
  public get fun4Weight(): number {
    return this.answers.reduce((fun4Weight, answer) => 
      {
      if (["6", "19", "32"].includes(answer.questionId)) {
        return fun4Weight + answer.answerWeight;
      } else {
        return fun4Weight;
      }
    }, 0);
  }
  public get fun513Weight(): number {
    return this.answers.reduce((fun513Weight, answer) => {
      if (["11", "24", "37","13", "26", "39","12", "25", "38","10", "23", "36","2", "15", "28","4", "17", "30","7", "20", "33","8", "21", "34","9", "22", "35",].includes(answer.questionId)) {
        return fun513Weight + answer.answerWeight;
      } else {
        return fun513Weight;
      }
    }, 0);
  }
  public get fun5Weight(): number {
        return this.answers.reduce((fun5Weight, answer) => {
      if (["2", "15", "28"].includes(answer.questionId)) {
        return fun5Weight + answer.answerWeight;
      } else {
        return fun5Weight;
      }
    }, 0);
  }
  public get fun6Weight(): number {
    return this.answers.reduce(
      (fun6Weight, answer) => 
      {
      if (["4", "17", "30"].includes(answer.questionId)) {
        return fun6Weight + answer.answerWeight;
      } else {
        return fun6Weight;
      }
    }, 0);
  }
  public get fun7Weight(): number {
    return this.answers.reduce((fun7Weight, answer) => {
      if (["7", "20", "33"].includes(answer.questionId)) {
        return fun7Weight + answer.answerWeight;
      } else {
        return fun7Weight;
      }
    }, 0);
  }
  public get fun8Weight(): number {
    return this.answers.reduce((fun8Weight, answer) => 
      {
      if (["8", "21", "34"].includes(answer.questionId)) {
        return fun8Weight + answer.answerWeight;
      } else {
        return fun8Weight;
      }
    }, 0);
  }
  public get fun9Weight(): number {
    return this.answers.reduce((fun9Weight, answer) => {
      if (["9", "22", "35"].includes(answer.questionId)) {
        return fun9Weight + answer.answerWeight;
      } else {
        return fun9Weight;
      }
    }, 0);
  }
  public get fun10Weight(): number {
    return this.answers.reduce(
      (fun10Weight, answer) => 
      {
      if (["10", "23", "36"].includes(answer.questionId)) {
        return fun10Weight + answer.answerWeight;
      } else {
        return fun10Weight;
      }
    }, 0);
  }
  public get fun11Weight(): number {
    return this.answers.reduce((fun11Weight, answer) => {
      if (["12", "25", "38"].includes(answer.questionId)) {
        return fun11Weight + answer.answerWeight;
      } else {
        return fun11Weight;
      }
    }, 0);
  }
  public get fun12Weight(): number {
    return this.answers.reduce((fun12Weight, answer) => 
      {
      if (["13", "26", "39"].includes(answer.questionId)) {
        return fun12Weight + answer.answerWeight;
      } else {
        return fun12Weight;
      }
    }, 0);
  }
  public get fun13Weight(): number {
    return this.answers.reduce((fun13Weight, answer) => 
      {
      if (["11", "24", "37"].includes(answer.questionId)) {
        return fun13Weight + answer.answerWeight;
      } else {
        return fun13Weight;
      }
    }, 0);
  }
  
  public get totalWeight(): number {
    return this.answers.reduce(
      (totalWeight, answer) => totalWeight + answer.answerWeight,
      0
    );
  }
}

