export interface ICategory {
  id?: number;
  name?: string;
}

export class Category {
  id?: number;
  name?: string;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
  }
}
