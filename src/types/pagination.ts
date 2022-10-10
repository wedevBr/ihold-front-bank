export type IPaginationData<T> = {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page?: number;
    from?: number;
    last_page?: number;
    links?: any;
    path?: string;
    per_page?: number;
    to?: number;
    total?: number;
  };
};
