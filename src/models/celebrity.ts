export interface ICelebrity {
  category: string;
  eligible_triggers?: string[];
  id: number;
  name: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
}

export class Celebrity {
  category?: string;
  eligible_triggers?: string[];
  id?: number;
  name?: string;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number;

  constructor(data: ICelebrity) {
    this.category = data.category;
    this.eligible_triggers = data.eligible_triggers;
    this.id = data.id;
    this.name = data.name;
    this.birth_day = data.birth_day;
    this.birth_month = data.birth_month;
    this.birth_year = data.birth_year;
  }
}
