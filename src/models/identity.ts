export interface IIdentity {
  name?: string;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number;
  category?: string;
  id?: number;
}

export class Identity {
  name?: string;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number;
  category?: string;
  id?: number;

  constructor(data: IIdentity) {
    this.name = data.name;
    this.birth_day = data.birth_day;
    this.birth_month = data.birth_month;
    this.birth_year = data.birth_year;
    this.category = data.category;
    this.id = data.id;
  }
}
