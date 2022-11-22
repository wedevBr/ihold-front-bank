export interface Client {
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
  phone: {
    number: string;
  };
}

export interface Address {
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
  key_type: FileProps | string;
}

export interface Auth {
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
  key_type: FileProps | string;
}

export interface ComercialData {
  nif_number: string;
  register_name: string;
  social_name: string;
  phone_number: string;
  email: string;
  size: 'MEI' | 'ME' | 'EPP' | 'SMALL' | 'MEDIUM' | 'LARGE';
  business_type_id: string;
  legal_nature_id: 0;
  site: string;
  cnae: string;
  joint_stock: 0;
  annual_billing: 0;
}

export interface CompanyAddress {
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
  proof_of_residency: FileProps | string;
}

export interface Documents {
  balance: FileProps | string;
  billing: FileProps | string;
  dre: FileProps | string;
}

export interface Password {
  password: string;
}

export type FileProps = {
  path: string;
  lastModified: number;
  slice: () => void;
  stream: () => void;
  text: () => void;
  arrayBuffer: ArrayBuffer;
  name: string;
  size: number;
  type: string;
};