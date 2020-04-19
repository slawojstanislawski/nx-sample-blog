import {Inject, Injectable} from '@angular/core';

import {IErrorMapperModuleConfig, IStatusCodeMap} from '../types';
import {ErrorMapperModuleConfig} from '../tokens';

@Injectable()
export class ErrorMapperService {
  private readonly messageExtractor: (error: any) => string;
  private readonly statusCodeExtractor: (error: any) => number;
  private statusCodeMapperFactory = (
    statusCodeMap: IStatusCodeMap
  ): ((error: any) => string | undefined) => {
    return (error: any): string | undefined => {
      if (error) {
        const statusCode = this.getStatusCode(error);
        if (statusCode) {
          return statusCodeMap[statusCode] || this.config.defaultErrorMessage;
        }
      }
    };
  };

  errorMessageMapper = (
    error: any,
    messageOverride: string = ''
  ): string | undefined => {
    if (error) {
      return (
        messageOverride ||
        this.getMessage(error) ||
        this.config.defaultErrorMessage
      );
    }
  };

  defaultStatusCodeMapper = (error: any): string | undefined => {
    if (error) {
      const statusCode = this.getStatusCode(error);
      return (
        (this.config.defaultStatusCodeMap &&
          statusCode &&
          this.config.defaultStatusCodeMap[statusCode]) ||
        this.config.defaultErrorMessage
      );
    }
  };

  extendedDefaultStatusCodeMapperFactory = (
    statusCodeOverridesMap: IStatusCodeMap
  ): ((error: any) => void) => {
    const statusCodeMap = {
      ...this.config.defaultStatusCodeMap,
      ...statusCodeOverridesMap
    };
    return this.statusCodeMapperFactory(statusCodeMap);
  };

  customStatusCodeMapperFactory = (
    statusCodeMap: IStatusCodeMap
  ): ((error: any) => void) => {
    return this.statusCodeMapperFactory(statusCodeMap);
  };

  consoleErrorMapper = (error): void => {
    if (error) {
      const errorMessage =
        this.getMessage(error) || this.config.defaultErrorMessage;
      console.error(errorMessage);
    }
  };

  getMessage = (error: any): string | undefined => {
    if (error) {
      return this.messageExtractor(error);
    }
  };

  getStatusCode = (error: any): number | undefined => {
    if (error) {
      return this.statusCodeExtractor(error);
    }
  };

  constructor(
    @Inject(ErrorMapperModuleConfig)
    private readonly config: IErrorMapperModuleConfig
  ) {
    this.messageExtractor = config.messageExtractor;
    this.statusCodeExtractor = config.statusCodeExtractor;
  }
}
