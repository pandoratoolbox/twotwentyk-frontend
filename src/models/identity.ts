export interface IIdentity {
  birth_year?: number;
  category?: string;
  id?: number;
  name?: string;
  birth_day?: number;
  birth_month?: number;
}

export class Identity {
  birth_year?: number;
  category?: string;
  id?: number;
  name?: string;
  birth_day?: number;
  birth_month?: number;

  constructor(data: IIdentity) {
    this.birth_year = data.birth_year;
    this.category = data.category;
    this.id = data.id;
    this.name = data.name;
    this.birth_day = data.birth_day;
    this.birth_month = data.birth_month;
  }
}
