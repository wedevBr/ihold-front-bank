import { api } from '../api';

export type dataGenerateTokenProps = {
  access_token: string;
  user_identifier: string;
  fcm_token: string;
};

export type generateTokenProps = {
  device_id: string;
  fcm_token: string;
};

export type infoPersonProps = {
  token: string;
  personalData: personalData;
};

export type personalData = {
  document_type: string;
  nif_number: string;
  register_name: string;
  social_name: string;
  birth_date: Date;
  mother_name: string;
  email: string;
  member_type: string;
  member_qualification: string;
  proxy_date: Date;
  percentual: number;
  presumed_income: number;
  pep: true;
  inform: true;

  address: {
    id: number;
    is_mailing_address: boolean;
    address_line_one: string;
    address_line_two: string;
    building_number: number;
    complement: string;
    zip_code: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  phone: {
    number: string;
  };
};

export type infoCompanyProps = {
  nif_number: string;
  register_name: string;
  social_name: string;
  email: string;
  site: string;
  phone_number: string;
  business_type_id: string;
  size: 'MEI' | 'ME' | 'EPP' | 'SMALL' | 'MEDIUM' | 'LARGE';
  legal_nature_id: 0;
  annual_billing: 0;
  cnae: string;
  joint_stock: 0;
  address: {
    is_mailing_address: boolean;
    zip_code: string;
    address_line_one: string;
    building_number: number;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
    country: string;
    id: number;
    address_line_two: string;
  };
};

export async function generateToken({
  device_id,
  fcm_token,
}: generateTokenProps) {
  try {
    const { data } = await api.post('/users', { device_id, fcm_token });
    return data;
  } catch (err: any) {
    throw err;
  }
}

export async function postPersonalInfo({
  personalData,
  token,
}: infoPersonProps) {
  try {
    const { data } = await api.post('/business_members', personalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err: any) {
    throw err;
  }
}


export async function postComercialInfo({
  personalData,
  token,
}: infoPersonProps) {
  try {
    const { data } = await api.post('/business_members', personalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err: any) {
    throw err;
  }
}

