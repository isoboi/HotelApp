import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'HotelApp',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44360/',
    redirectUri: baseUrl,
    clientId: 'HotelApp_App',
    responseType: 'code',
    scope: 'offline_access HotelApp',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44360',
      rootNamespace: 'HotelApp',
    },
  },
} as Environment;
