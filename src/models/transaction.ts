// transaction.ts
export interface ITransaction {
  created_at: Date | string | number;
  type: string;
  amount: number;
  description: string;
  user_id: number;
}

export class Transaction {
  created_at: Date;
  type: string;
  amount: number;
  description: string;
  user_id: number;

  constructor(data: ITransaction) {
    this.created_at = new Date(data.created_at);
    this.type = data.type;
    this.amount = data.amount;
    this.description = data.description;
    this.user_id = data.user_id;
  }
}
