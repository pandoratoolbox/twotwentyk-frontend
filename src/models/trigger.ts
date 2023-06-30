export interface ITrigger {
  name?: string;
  tier?: string;
  id?: number;
}

export class Trigger {
  name?: string;
  tier?: string;
  id?: number;

  constructor(data: ITrigger) {
    this.name = data.name;
    this.tier = data.tier;
    this.id = data.id;
  }
}
