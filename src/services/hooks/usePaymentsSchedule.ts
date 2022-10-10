import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import { IPaginationData } from '~/types/pagination';
import { IDataPIX } from '~/types/scheduledTransactions';
import { useQuery } from 'react-query';

export async function registerPayment(transactionData: FormData) {
  try {
    const { data } = await api.post('/schedule_transactions', transactionData);
    return {
      message: data.detail,
    };
  } catch (err: any) {
    throw err;
  }
}
export const getValidateScheduleTransaction = async (): Promise<
  IPaginationData<IDataPIX>
> => {
  try {
    const { data } = await api.get(
      '/schedule_transactions?include[]=transactionType&include[]=status&include[]=transaction&include[]=account&sort[]=-created_at&filter[transaction_type_id]=2'
    );
    return {
      data: data?.data,
      links: data?.links,
      meta: data?.meta,
    };
  } catch (err: any) {
    throw new HandleError(err.response);
  }
};

export function useScheduleTransactions() {
  return useQuery(
    ['getScheduleTransactions'],
    () => getValidateScheduleTransaction(),
    {
      staleTime: 1000 * 5,
    }
  );
}

export async function DeleteScheduleTransactions(transactionId: number) {
  try {
    api.delete(`/schedule_transactions/${transactionId}`);
  } catch (err: any) {
    throw new HandleError(err.response);
  }
}
