export interface ITrigger {
  id?: number;
  name?: string;
  tier?: string;
}

export class Trigger {
  id?: number;
  name?: string;
  tier?: string;

  constructor(data: ITrigger) {
    this.id = data.id;
    this.name = data.name;
    this.tier = data.tier;
  }
}
