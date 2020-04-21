import {InjectionToken} from '@angular/core';
import {
  IErrorMapperModuleConfig,
  IErrorToIndicatorMapper,
  IErrorToStringMapper
} from './types';

export const ErrorMapperModuleConfig = new InjectionToken<
  IErrorMapperModuleConfig
>('error-mapper-module-config');

export const ErrorToMessageMapper = new InjectionToken<IErrorToStringMapper>(
  'error-to-message-mapper'
);

export const ErrorToStatusCodeMessageMapper = new InjectionToken<
  IErrorToStringMapper
>('error-to-status-code-message-mapper');

export const ErrorToIndicatorMapper = new InjectionToken<
  IErrorToIndicatorMapper
>('error-to-indicator-mapper');
