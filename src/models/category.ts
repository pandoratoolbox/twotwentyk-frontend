export interface ICategory {
  id?: number;
  label?: string;
  name?: string;

}

export class Category {
  id?: number;
  label?: string;
  name?: string;

  constructor(data: ICategory) {
    this.id = data.id;
    this.label = data.label;
    this.name = data.name;
  }
}
