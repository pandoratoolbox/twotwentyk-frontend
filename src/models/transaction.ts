// transaction.ts

import { IUser } from "./user";

export interface ITransaction {
  created_at?: number | string | Date;
  sender?: IUser;
  recipient?: IUser;
  id?: number;
  sender_id?: number;
  recipient_id?: number;
  amount?: number;
  description?: string;
  status?: number;
}

