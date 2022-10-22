import {
  IPixAndTEDStatementsData,
  ITransaction_type,
  StatementData,
} from '~/types/statements.types';
import { api } from '../api';

export async function GetAllStatementsOperation(statementId: number) {
  try {
    const { data } = await api.get<StatementData>(
      `/statements?include[]=payload&sort[]=completed_at${
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
      `/statements?include[]=payload&sort[]=completed_at&filter[operation]=${statementOperation}${
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
  date_end: string
) {
  try {
    const { data } = await api.get(
      `/statements/downloads/extract/${type}?filter[between_dates]=${date_start},${date_end}`,
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
