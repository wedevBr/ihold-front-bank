/* @interface Transaction Type PIX
 */
export interface IDataPIX {
  id: number;
  scheduled_date: string;
  is_approved: boolean;
  completed_at: string;
  created_at: string;
  payload: IPayloadPix;
  transaction: ITransaction;
  transaction_type: ITransactionType;
  status: IStatus;
  account: IAccount;
}

export interface IDataBillPayment {
  id: number;
  scheduled_date: string;
  is_approved: boolean;
  completed_at: string;
  created_at: string;
  payload: IPayloadTicket;
  transaction: ITransaction;
  transaction_type: ITransactionType;
  status: IStatus;
  account: IAccount;
}

export interface IDataTed {
  id: number;
  scheduled_date: string;
  is_approved: boolean;
  completed_at: string;
  created_at: string;
  payload: IPayloadTed;
  transaction: ITransaction;
  transaction_type: ITransactionType;
  status: IStatus;
  account: IAccount;
}

 interface IPayloadTicket {
  digitable_line: string;
  payment_date: any;
  description: string;
  amount: number
}

interface IPayloadPix {
  key_type: string;
  key: string;
  amount: string;
  description: string;
  nif_number: string;
  email: string;
}

interface IPayloadTed {
  amount: string;
  description: string;
  recipient: IRecipient;
}

export interface IRecipient {
  account_type: string;
  bank_code: string;
  bank_name: string;
  branch: string;
  account: string;
  document: string;
  name: string;
}

export interface ITransaction {
  id: number;
  txid: string;
  transaction: string;
  amount: string;
  amount_cents: string;
  description: string;
  operation: string;
  process_at: string;
  completed_at: string;
  due_date: string;
  metadata: [];
}

export interface IAccount {
  id: number;
  account_type: string;
  nif_number: string;
  register_name: string;
  social_name: string;
  birth_date: string;
  mother_name: string;
  email: string;
}

export interface ITransactionType {
  id: number;
  name: string;
  tag: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IUploadTransactionData {
  transaction_type: string;
  file: string;
}
