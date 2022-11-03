import { PixQRCode } from '~/types/accounts.types';
import { api } from '../api';

export async function GetPixPaymentInfo(qrcode_uuid: string | string[]) {
  try {
    const { data } = await api.get<PixQRCode>(`/pix/qrcode/${qrcode_uuid}`);
    return data;
  } catch (error) {
    throw error;
  }
}