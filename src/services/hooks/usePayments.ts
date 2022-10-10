import { api } from "../api";
import { HandleError } from '~/error/HandlerError';


interface RegisterPayment {
    file: File;
    transaction_type:string;
  }

export async function registerPayment(transactionData: RegisterPayment) {
  try {
      const { data } = await api.post("/schedule_transactions", transactionData);
      return {
          message: data.detail
      }
  } catch (err: any) {
      throw new HandleError(err.response)
  }
}