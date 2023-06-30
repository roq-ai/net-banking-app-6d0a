import { UserInterface } from 'interfaces/user';
import { BankInterface } from 'interfaces/bank';
import { GetQueryInterface } from 'interfaces';

export interface BillInterface {
  id?: string;
  amount: number;
  due_date: any;
  user_id?: string;
  bank_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  bank?: BankInterface;
  _count?: {};
}

export interface BillGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  bank_id?: string;
}
