import { request } from 'graphql-request';
import { API_URL, C_API_URL } from 'constants/graphql';

export const shopFetcher = (query: string, variables: any, locale: string, requestHeaders: any) => request(`${API_URL}`, query, {
    ...variables,
    _locale:locale
  }, requestHeaders);
  
  export const checkoutFetcher = (query: string, variables: any, locale: string, requestHeaders: any) => request(`${C_API_URL}`, query, {
    ...variables,
    _locale:locale
  }, requestHeaders);
  