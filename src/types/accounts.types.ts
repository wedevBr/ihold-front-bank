export type IUserData = {
  id: number;
  nif_number: string;
  register_name: string;
  social_name: string;
  birth_date: string;
  mother_name: string;
  email: string;
};
export type User = {
  account_type_id: number;
  avatar: {
    file_detail: {
      url: string;
      mime_type: string;
    };
    file_name: string;
    id: number;
  };
  id: number;
  nif_number: string;
  register_name: string;
  social_name: string | null;
  birth_date: string;
  mother_name: string | null;
  email: string;
  user: {
    device_id: string;
    id: number;
    user_identifier: string;
  };
};

export interface AccountUser {
  data: User;
  statusCode: number;
}

export type IAccountBalance = {
  amount: number;
};
