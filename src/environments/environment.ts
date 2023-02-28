import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'HotelApp',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://kyid3-anular-api.avilum.ru/',
    redirectUri: baseUrl,
    clientId: 'HotelApp_App',
    responseType: 'code',
    scope: 'offline_access HotelApp',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://kyid3-anular-api.avilum.ru',
      rootNamespace: 'HotelApp',
    },
  },
} as Environment;
