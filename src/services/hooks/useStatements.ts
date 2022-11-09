import {
  IPixAndTEDStatementsData,
  ITransaction_type,
  StatementData,
} from '~/types/statements.types';
import { useQuery } from 'react-query';
import { api } from '../api';
import moment from 'moment';

export async function GetAllStatementsOperation(statementId: number) {
  try {
    const { data } = await api.get<StatementData>(
      `/statements?include[]=payload&sort[]=-completed_at${
        statementId !== 0 ? `&filter[transaction_type_id]=${statementId}` : ``
      }`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function GetStatementsOperation(
  statementOperation: string,
  statementId: number
) {
  try {
    const { data } = await api.get<StatementData>(
      `/statements?include[]=payload&sort[]=-completed_at&filter[operation]=${statementOperation}${
        statementId !== 0 ? `&filter[transaction_type_id]=${statementId}` : ``
      } `
    );
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function GetStatementsDownloadVoucher(statementId: number) {
  try {
    const { data } = await api.get(`/statements/downloads/${statementId}`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function GetStatementsDownloadExtract(
  type: string,
  date_start: string,
  date_end: string,
  typeTrasanction?: 'pix' | 'transfer' | 'bill-payment'
) {
  try {
    const { data } = await api.get(
      `/statements/downloads/extract/${type}?sort[]=completed_at&filter[between_dates]=${date_start},${date_end}${
        !!typeTrasanction
          ? `&filter[transaction_type_id]=${
              typeTrasanction === 'pix'
                ? '2'
                : typeTrasanction === 'transfer'
                ? '1'
                : '3'
            }`
          : ''
      }`,
      {
        responseType: 'blob',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllStatementsOperation(
  statementId?: string,
  page?: number,
  per_page?: number,
  date_start?: string,
  date_end?: string,
  statementOperation?: string
) {
  try {
    const { data } = await api.get<StatementData>(
      `/statements?include[]=payload&sort[]=-completed_at${
        date_start && date_end
          ? `&filter[between_dates]=${date_start},${date_end}`
          : ''
      }${
        !!statementId
          ? `&filter[transaction_type_id]=${
              statementId === 'pix'
                ? '2'
                : statementId === 'transfer'
                ? '1'
                : '3'
            }`
          : ''
      }${
        !!statementOperation ? `&filter[operation]=${statementOperation}` : ''
      }`,
      {
        params: {
          'page[size]': per_page,
          'page[number]': page,
        },
      }
    );
    const objectData: any = {};
    data?.data?.map((item) =>
      objectData[moment(item.completed_at).format('YYYY-MM-DD')]
        ? (objectData[moment(item.completed_at).format('YYYY-MM-DD')] = [
            ...objectData[moment(item.completed_at).format('YYYY-MM-DD')],
            item,
          ])
        : (objectData[moment(item.completed_at).format('YYYY-MM-DD')] = [item])
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
  } catch (error: any) {
    throw error;
  }
}

export function useTransactions(
  page?: number,
  per_page?: number,
  statementId?: string,
  date_start?: string,
  date_end?: string,
  statementOperation?: string
) {
  return useQuery(
    [
      'getCustomers',
      { page, per_page, statementId, date_start, date_end, statementOperation },
    ],
    () =>
      getAllStatementsOperation(
        statementId,
        page,
        per_page,
        date_start,
        date_end,
        statementOperation
      ),
    {
      staleTime: 1000 * 5,
    }
  );
}
