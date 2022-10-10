import { api } from "../api";
import { HandleError } from '~/error/HandlerError';


export async function registerPayment(transactionData: FormData) {
  try {
      const { data } = await api.post("/schedule_transactions", transactionData);
      return {
          message: data.detail
      }
  } catch (err: any) {
      throw new HandleError(err.response)
  }
}