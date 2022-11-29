export interface Client {
  document_type: 'CPF';
  nif_number: string;
  register_name: string;
  social_name: string;
  birth_date: Date;
  mother_name: string;
  email: string;
  member_type: 'OWNER';
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
  // key_type: FileProps | string;
}

export interface HasMember {
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
  pep: boolean;
  inform: boolean;
  phone: {
    number: string;
  };
  address: Address;
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
  birth_date: Date;
  size: 'MEI' | 'ME' | 'EPP' | 'SMALL' | 'MEDIUM' | 'LARGE';
  business_type_id: string;
  legal_nature_id: number;
  site: string;
  cnae: string;
  joint_stock: 0;
  annual_billing: 0;
  hasMember?: HasMember[];
}

export interface CompanyAddress {
  id: number;
  is_mailing_address: boolean;
  address_line_one: string;
  address_line_two: string;
  building_number: number;
  complement: string;
  zip_code: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  proof_of_residency: FileProps | string;
}

export interface Documents {
  front_document: documentBody;
  back_documment: documentBody;
  selfie: documentBody;
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

export interface ComercialProps {
  nif_number: string;
  register_name: string;
  social_name: string;
  phone_number: string;
  email: string;
  birth_date?: Date;
  size?: 'MEI' | 'ME' | 'EPP' | 'SMALL' | 'MEDIUM' | 'LARGE';
  business_type_id?: number;
  legal_nature_id?: number;
  site: string;
  cnae: string;
  joint_stock: 0;
  annual_billing: 0;
  address: CompanyAddress;
}

export interface PersonalProps {
  document_type?: 'CPF';
  nif_number?: string;
  register_name?: string;
  social_name?: string;
  birth_date?: Date;
  mother_name?: string;
  email?: string;
  member_type?: 'OWNER';
  member_qualification?: string;
  proxy_date?: Date;
  percentual?: number;
  presumed_income?: number;
  pep?: boolean;
  inform?: boolean;
  phone?: {
    number?: string;
  };
  address?: Address;
}

export type infoPersonProps = {
  token: string;
  personalData: PersonalProps;
};

export type infoComercialProps = {
  token: string;
  comercialData: ComercialProps;
};

export type password = {
  token: string;
  passwordData: passwordProps;
};

export type passwordProps = {
  name: string;
  nif_number: string;
  cell_phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_identifier?: string;
  client_id?: string;
  client_secret?: string;
};

export type documentBody = {
  side: 'front' | 'back';
  document_type: string;
  file: FileProps;
  description: string;
  file_name: string;
};

export type documentType = {
  document_type:
    | 'SELFIE'
    | 'NATIONAL_ID'
    | 'NATIONAL_DRIVE_LICENSE'
    | 'PROOF_OF_RESIDENCY'
    | 'CPF'
    | 'CNPJ'
    | 'QSA'
    | 'SOCIAL_BALANCE'
    | 'SOCIAL_CONTRACT'
    | 'SOCIAL_STATUS';
};

export type document = {
  token: string;
  DocumentData: documentBody;
};
