import fs from "node:fs";

// Определяем класс Repository, который принимает два аргумента в конструкторе: path - путь к файлу базы данных и repositoryKey - ключ, по которому будут храниться данные.
export class Repository<T> {
  public constructor(public path: string, public repositoryKey: string) {}

 // Определяем приватный метод _get(), который считывает данные из файла базы данных. 
 // Если файл существует, то данные парсятся из JSON-строки и возвращаются в виде объекта. 
 // Если файл не существует, то возвращается пустой объект. Если в объекте нет ключа, соответствующего repositoryKey, то он создается.

  private _get(): Record<string, Record<string, any>> {
    let database: Record<string, Record<string, any>>;

    if (fs.existsSync(this.path)) {
      database = JSON.parse(fs.readFileSync(this.path).toString());
    } else {
      database = {};
    }

    if (database[this.repositoryKey] === undefined) {
      database[this.repositoryKey] = {};
    }

    return database;
  }
 // Определяем приватный метод _set(), который записывает данные в файл базы данных. Данные передаются в виде объекта и преобразуются в JSON-строку.
  private _set(data: Record<string, Record<string, any>>): void {
    fs.writeFileSync(this.path, JSON.stringify(data));
  }
 // Определяем публичный метод save(), который сохраняет данные в базу данных. Данные передаются в виде объекта типа T и сохраняются по ключу id в объекте с ключом repositoryKey. 
 // После сохранения данных вызывается метод _set() для записи изменений в файл базы данных.
  public save(id: string, data: T): void {
    const database = this._get();

    database[this.repositoryKey][id] = data;

    this._set(database);
  }
 // Определяем публичный метод getAll(), который возвращает все данные из базы данных, хранящиеся по ключу repositoryKey.

  public getAll(): Record<string, T> {
    return this._get()[this.repositoryKey];
  }
 // Определяем публичный метод get(), который возвращает данные из базы данных по ключу id, хранящиеся по ключу repositoryKey. 
 // Если данных с таким ключом нет, то возвращается undefined.
  public get(id: string): T | undefined {
    return this.getAll()[id];
  }
}
