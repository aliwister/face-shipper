import { request } from 'graphql-request';

export const shopFetcher = (query: string, variables: any, locale: string) => request(`${process.env.API_URL}`, query, {
    ...variables,
    _locale:locale
  });
  