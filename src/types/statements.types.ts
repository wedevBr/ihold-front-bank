export interface StatementData {
  data?: IPixAndTEDStatementsData[];
  links: {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page?: number;
    from?: number;
    last_page?: number;
    links?: any;
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
  };
  summary?: ISummary;
}

export interface IPixAndTEDStatementsData {
  id: number;
  txid: string;
  transaction: string;
  amount: string;
  amount_cents: number;
  description: string;
  operation: string;
  due_date: Date | null;
  process_at: Date;
  completed_at: Date;
  metadata?: IMetadataPixAndTED;
  transaction_type?: ITransactionType;
}

export interface ITransferStatementsData {
  payment_date(payment_date: any): import('react').ReactNode;
  id: number;
  txid: string;
  transaction: string;
  amount: string;
  amount_cents: number;
  description: string;
  operation: string;
  due_date: Date | null;
  process_at: Date;
  completed_at: Date;
  metadata?: IMetadataTransfer;
  transaction_type: ITransactionType;
}

export interface ICardTransferStatementsData {
  id: number;
  txid: string;
  transaction: string;
  amount: string;
  amount_cents: number;
  description: string;
  operation: string;
  due_date: Date | null;
  process_at: Date;
  completed_at: Date;
  metadata: IMetadataCardTransfer;
  transaction_type: ITransactionType;
}

interface IMetadataPixAndTED {
  sender: ISender;
  recipient: IRecipient;
  payload: Payload;
  recipient_name: string;
  assignor?: string;
}

interface Payload {
  merchant: {
    id: string;
    name: string;
  };
}

interface IMetadataTransfer {
  digitable: string;
  amount: number;
  original_amount: number;
  assignor: string;
  recipient_document: string | null;
  recipient_name?: string | null | undefined;
  charges: ICharges;
  settle_date: Date;
  payment_date: Date;
  due_date: Date;
  type: string;
}

interface IMetadataCardTransfer {
  id: number;
  payload: IPayload;
  payloadable_type: string;
  payloadable_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

interface IPayload {
  account: IAccount;
  amount: IAmount;
  merchant: IMerchant;
  authorizationCode: string;
  status: string;
  transactionTimestamp: string;
}
interface IRecipient {
  name: string;
  agency: string;
  account: string;
  document: string;
  bank?: IBank;
}

interface IBank {
  name: string;
  short_name: string;
  code: number;
  ispb: string;
  products: [object];
}

interface ISender {
  name: string;
  branch: string;
  account: string;
  document: string;
  bank?: IBank;
}

interface ICharges {
  interest_amount_calculated: number;
  fine_amount_calculated: number;
  discount_amount: number;
}

interface IAccount {
  number: string;
  agency: string;
}

interface IAmount {
  value: number;
  local: number;
  net: number;
  iof: number;
  markup: number;
}

interface IMerchant {
  id: string;
  name: string;
  mcc: string;
  city: string;
}

interface ITransactionType {
  id: number;
  name: string;
  tag: string;
}

export interface ISummary {
  cash_in: {
    amount: string;
  };
  cash_out: {
    amount: string;
  };
}

export type ITransaction_type =
  | 'transfer'
  | 'pix'
  | 'card-transaction'
  | 'bill-payment'
  | 'deposit-billet';
