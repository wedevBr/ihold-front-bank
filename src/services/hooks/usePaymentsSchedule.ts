import { api } from '../api';
import { HandleError } from '~/error/HandlerError';
import { IPaginationData } from '~/types/pagination';
import {
  IDataBillPayment,
  IDataPIX,
  IDataTed,
} from '~/types/scheduledTransactions';
import { useQuery } from 'react-query';
import moment from 'moment';

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
export type transaction = 'pix' | 'transfer' | 'bill-payment';
export const getValidateScheduleTransaction = async (
  type?: transaction,
  per_page?: number,
  page?: number,
  filterApproved?: 'true' | 'false'
) => {
  try {
    const { data } = await api.get(
      `/schedule_transactions?include[]=transactionType&include[]=status&include[]=transaction&include[]=account&&sort[]=-created_at&filter[transaction_type_id]=${
        type === 'pix' ? '2' : type === 'transfer' ? '1' : '3'
      }${!!filterApproved ? `&filter[approved]=${filterApproved}` : ''}`,
      {
        params: {
          'page[size]': per_page || 50,
          'page[number]': page,
        },
      }
    );
    const objectData: any = {};
    data?.data?.map((item: any) =>
      objectData[moment(item.created_at).format('YYYY-MM-DD')]
        ? (objectData[moment(item.created_at).format('YYYY-MM-DD')] = [
            ...objectData[moment(item.created_at).format('YYYY-MM-DD')],
            item,
          ])
        : (objectData[moment(item.created_at).format('YYYY-MM-DD')] = [item])
    );

    const formatData = Object.entries(objectData)?.map((objects) => {
      const [key, values]: any[] = objects;

      return {
        date: key,
        item: values,
      };
    });
    return {
      ...data,
      data: formatData,
    };
  } catch (err: any) {
    throw new HandleError(err.response);
  }
};

export function useScheduleTransaction(
  type?: transaction,
  page?: number,
  per_page?: number,
  filterApproved?: 'true' | 'false'
) {
  return useQuery(
    [
      'getScheduleTransaction',
      {
        type,
        page,
        filterApproved,
        per_page,
      },
    ],
    () => getValidateScheduleTransaction(type, per_page, page, filterApproved),
    {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
    }
  );
}
