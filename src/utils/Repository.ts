import fs from "node:fs";

export class Repository<T> {
  public constructor(public path: string, public repositoryKey: string) {}

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

  private _set(data: Record<string, Record<string, any>>): void {
    fs.writeFileSync(this.path, JSON.stringify(data));
  }

  public save(id: string, data: T): void {
    const database = this._get();

    database[this.repositoryKey][id] = data;

    this._set(database);
  }

  public getAll(): Record<string, T> {
    return this._get()[this.repositoryKey];
  }

  public get(id: string): T | undefined {
    return this.getAll()[id];
  }
}
