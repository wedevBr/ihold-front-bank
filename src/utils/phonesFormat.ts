/* eslint-disable no-param-reassign */
export const phonesFormat = (value: string | undefined) => {
  if (!value) return '';

  let value_old = value;
  value = value.replace(/[^\d]/g, '');

  function formate(phone: string) {
    if (phone.length >= 12 && phone.length <= 13) {
      // Com DDD com PAIS
      return phone.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '+$1 ($2) $3-$4');
    }

    if (phone.length >= 10 && phone.length <= 11) {
      // Com DDD
      return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }

    if (phone.length >= 8 && phone.length <= 9) {
      // Sem DDD
      return phone.replace(/(\d{4,5})(\d{4})/, '$1-$2');
    }
  }

  if (value.length > 0) {
    if (value.length >= 8 && value.length <= 13) {
      // Com DDD
      return formate(value);
    }

    // Formata telefones das listagens.
    if (value.length >= 14) {
      // Dois numeros com DDD
      let result = value_old.split(' | ');
      let phones: any = [];
      result.forEach((phone) => {
        phones.push(formate(phone));
      });
      return phones.join(' | ');
    }

    return value;
  }
  return false;
};
