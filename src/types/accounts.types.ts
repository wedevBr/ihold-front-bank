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

export type PixQRCode = {
  data: {
    id: number,
    qr_code: string,
    uuid: string,
    decoded: {
      end_to_end_id: string,
      conciliation_id: string,
      addressing_key: {
        type: number,
        value: string
      },
      qr_code_type: any,
      holder: {
        account: {
          branch: number,
          number: number
        }
        type: string,
        document: {
          type: string,
          value: string 
        },
        name: string
      },
      bank: {
        name: string,
        code: number
      }
      payment: {
        base_value: number,
        interest_value: number,
        penalty_value: number,
        discount_value: number,
        totalValue: number
      },
      location: {
        city: string,
        zip_code: string
      },
      additional_data: [
        {
          name: string,
          value: string
        }
      ]
    },
    statusCode: number
  },
  statusCode: number
}