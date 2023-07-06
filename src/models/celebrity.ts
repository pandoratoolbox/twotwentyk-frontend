export interface ICelebrity {
  name: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
  category: string;
  eligible_triggers?: string[];
  id: number;
}

export class Celebrity {
  name?: string;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number;
  category?: string;
  eligible_triggers?: string[];
  id?: number;

  constructor(data: ICelebrity) {
    this.name = data.name;
    this.birth_day = data.birth_day;
    this.birth_month = data.birth_month;
    this.birth_year = data.birth_year;
    this.category = data.category;
    this.eligible_triggers = data.eligible_triggers;
    this.id = data.id;
  }
}
