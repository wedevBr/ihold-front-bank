import { IPixAndTEDStatementsData, ITransaction_type, StatementData } from '~/types/statements.types';
import { api } from '../api';



export async function GetAllStatementsOperation(
  type?: ITransaction_type)  {
  try {
    const { data } = await api.get<StatementData>(`/statements?include[]=payload&sort[]=completed_at${type ? `&filter[transaction_type_id]=2` : ""
      }`);
    return data;
  } catch (error: any) {
    throw error;
  }
}