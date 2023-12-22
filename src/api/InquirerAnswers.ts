// Импортируются константы и класс для работы с базой данных.
import { DATABASE_PATH } from "~/constants";
import { Repository } from "~/utils/Repository";  

// Определяется интерфейс для объекта ответов на опрос.
export interface InquirerAnswersDTO {
  readonly id: string;
  readonly inquirerId: string;
  readonly answers: Record<string, string>;
  readonly date: number;
}

// Определяется интерфейс для параметров фильтрации ответов на опрос.
export interface InquirerAnswersFilterParams {
  inquirerId?: string;
}

// Определяется класс InquirerAnswers, который реализует интерфейс InquirerAnswersDTO.  
export class InquirerAnswers implements InquirerAnswersDTO {
  private static _repository = new Repository<InquirerAnswersDTO>(
    DATABASE_PATH,
    "inquirer"
  );

  public readonly id: string;
  public readonly inquirerId: string;
  public readonly answers: Record<string, string>;
  public readonly date: number;

  // В конструкторе класса принимается объект типа InquirerAnswersDTO и на его основе создаются свойства экземпляра класса.
  public constructor(dto: InquirerAnswersDTO) {
    this.id = dto.id;
    this.inquirerId = dto.inquirerId;
    this.answers = dto.answers;
    this.date = dto.date;
  }

  public get DTO(): InquirerAnswersDTO {
    return {
      id: this.id,
      inquirerId: this.inquirerId,
      answers: this.answers,
      date: this.date,
    };
  }

  // Cохраняет объект в базу данных
  public save(): void {
    InquirerAnswers._repository.save(this.id, this.DTO);
  }

 // Возвращает объект из базы данных по заданному id
  public static get(id: string): InquirerAnswers | undefined {
    const dto = InquirerAnswers._repository.get(id);

    return dto ? new InquirerAnswers(dto) : undefined;
  }

 // Возвращает все объекты из базы данных с возможностью фильтрации по параметру inquirerId.
  public static getAll({
    inquirerId,
  }: InquirerAnswersFilterParams = {}): InquirerAnswers[] {
    let data = Object.values(InquirerAnswers._repository.getAll());

    if (inquirerId !== undefined) {
      data = data.filter((result) => result.inquirerId === inquirerId);
    }

    return data.map((dto) => new InquirerAnswers(dto));
  }
}
