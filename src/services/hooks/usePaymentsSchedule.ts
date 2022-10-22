import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import { IPaginationData } from '~/types/pagination';
import {
  IDataBillPayment,
  IDataPIX,
  IDataTed,
} from '~/types/scheduledTransactions';
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
export const getValidateScheduleTransaction = async <T>(
  type?: 'pix' | 'transfer' | 'bill-payment',
  per_page?: number,
  filterApproved?: 'true' | 'false'
): Promise<IPaginationData<T>> => {
  try {
    const { data } = await api.get(
      `/schedule_transactions?include[]=transactionType&include[]=status&include[]=transaction&include[]=account&filter[transaction_type_id]=${
        type === 'pix' ? '2' : type === 'transfer' ? '1' : '3'
      }${!!filterApproved ? `&filter[approved]=${filterApproved}` : ''}`,
      {
        params: {
          'page[size]': 10,
          // 'page[number]': 1,
        },
      }
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

// export function useScheduleTransactions(page?: number) {
//   return useQuery(
//     ['getScheduleTransactions', page],
//     () => getValidateScheduleTransaction(page),
//     {
//       keepPreviousData: true,
//     }
//   );
// }

export async function DeleteScheduleTransactions(transactionId: number) {
  try {
    api.delete(`/schedule_transactions/${transactionId}`);
  } catch (err: any) {
    throw new HandleError(err.response);
  }
}
export async function GetScheduleAllTransactionDataApproved(
  transactionId: number,
  secretPassword: string
) {
  try {
    const { data } = await api.get(
      `/schedule_transactions/approve/${transactionId}`,
      {
        headers: {
          'Secret-Password': `${secretPassword}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log();
  }
}

export async function UpdateScheduleTransactions(
  transactionId: number,
  transactionData: object
) {
  try {
    const { data } = await api.put(
      `/schedule_transactions/${transactionId}`,
      transactionData
    );
    return data;
  } catch (error: any) {
    throw error;
  }
}
