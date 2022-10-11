type FormatProps = {
  format: 'cpf' | 'cnpj';
  regex: RegExp;
  replace: string;
};

const formats: FormatProps[] = [
  {
    format: 'cpf',
    regex: /(\d{3})?(\d{3})?(\d{3})?(\d{2})/,
    replace: '$1.$2.$3-$4',
  },
  {
    format: 'cnpj',
    regex: /(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/,
    replace: '$1.$2.$3/$4-$5',
  },
];

export function nifFormat(text: string, format: string) {
  const formated = formats.find((item) => item.format === format);

  return formated ? text.replace(formated.regex, formated.replace) : text;
}
