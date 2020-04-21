import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {
  ErrorMapperService,
  ErrorToIndicatorMapper,
  ErrorToMessageMapper,
  ErrorToStatusCodeMessageMapper,
  IErrorToIndicatorMapper,
  IErrorToStringMapper,
  SharedErrorMapperModule
} from '@blog/shared/error-mapper';
import {SharedSnackbarModule, SnackbarService} from '@blog/shared/snackbar';
import {IApiError} from '@blog/shared/data-access';

@NgModule({
  imports: [
    CommonModule,
    SharedSnackbarModule,
    SharedErrorMapperModule.forFeature({
      messageExtractor: (error: IApiError) => error.message,
      statusCodeExtractor: (error: IApiError) => error.statusCode,
      defaultStatusCodeMap: {
        500: 'Oh snap, server error',
        404: 'Umm, found nothing',
        401: 'Not allowed, sorry'
      }
    })
  ],
  providers: [
    {
      provide: ErrorToStatusCodeMessageMapper,
      useFactory: (mapper: ErrorMapperService): IErrorToStringMapper => (
        err: IApiError
      ) => mapper.defaultStatusCodeMapper(err),
      deps: [ErrorMapperService]
    },
    {
      provide: ErrorToIndicatorMapper,
      useFactory: (
        mapper: ErrorMapperService,
        snackbarService: SnackbarService,
        statusCodeMapper: IErrorToStringMapper
      ): IErrorToIndicatorMapper => {
        return (e: IApiError) => {
          if (e) {
            const message = statusCodeMapper(e);
            if (message) {
              snackbarService.failure(message);
            }
          }
        };
      },
      deps: [
        ErrorMapperService,
        SnackbarService,
        ErrorToStatusCodeMessageMapper
      ]
    },
    {
      provide: ErrorToMessageMapper,
      useFactory: (mapper: ErrorMapperService): IErrorToStringMapper => (
        err: IApiError
      ) => mapper.errorMessageMapper(err),
      deps: [ErrorMapperService]
    }
  ]
})
export class BlogDataAccessErrorHandlerModule {}
