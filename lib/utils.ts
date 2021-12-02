import { request } from 'graphql-request';
import { API_URL } from 'constants/graphql';

export const shopFetcher = (query: string, variables: any, locale: string, requestHeaders: any) => request(`${API_URL}`, query, {
    ...variables,
    _locale:locale
  }, requestHeaders);
  