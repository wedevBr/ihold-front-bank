import { api } from '../api';

export type ITransaction_type =
  | "transfer"
  | "pix"
  | "card-transaction"
  | "bill-payment"
  | "deposit-billet";

export async function GetAllStatementsOperation(
  type?: ITransaction_type) {
  try {
    const { data } = await api.get(`/statements?include[]=payload&sort[]=completed_at${type ? `&filter[transaction_type_id]=2` : ""
      }`);
    return data;
  } catch (error: any) {
    throw error;
  }
}