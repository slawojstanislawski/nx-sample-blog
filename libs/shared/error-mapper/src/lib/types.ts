export interface IErrorMapperModuleConfig {
  messageExtractor: (error: any) => string;
  statusCodeExtractor: (error: any) => number;
  defaultStatusCodeMap?: IStatusCodeMap;
  defaultErrorMessage: string;
}

export interface IStatusCodeMap {
  [key: number]: string;
}

export type IErrorToStringMapper = (error: any) => string | undefined;
export type IErrorToIndicatorMapper = (error: any) => any;
