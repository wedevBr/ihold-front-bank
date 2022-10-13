import { api } from '../api';
import { HandleError } from '~/error/HandlerError';

export async function GetSchedulePixTransactionData() {
  return await (
    await api.get(
      '/schedule_transactions?include[]=transactionType&include[]=status&include[]=transaction&include[]=account&sort[]=-created_at&filter[transaction_type_id]=2'
    )
  ).data;
}
