import { request } from 'graphql-request';

export const shopFetcher = (query: string, variables: any, locale: string, requestHeaders: any) => request(`${process.env.API_URL}`, query, {
    ...variables,
    _locale:locale
  }, requestHeaders);
  