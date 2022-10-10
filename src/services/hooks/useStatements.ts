import { IPixAndTEDStatementsData, ITransaction_type, StatementData } from '~/types/statements.types';
import { api } from '../api';



export async function GetAllStatementsOperation(
  statementId: number) {
  try {
    const { data } = await api.get<StatementData>(`/statements?include[]=payload&sort[]=completed_at${statementId !== 0 ? `&filter[transaction_type_id]=${statementId}` : ``}`);
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
      `/statements?include[]=payload&sort[]=completed_at&filter[operation]=${statementOperation}${statementId !== 0 ? `&filter[transaction_type_id]=${statementId}` : ``} `);
    return data;
  } catch (error: any) {
    throw error;
  }
}