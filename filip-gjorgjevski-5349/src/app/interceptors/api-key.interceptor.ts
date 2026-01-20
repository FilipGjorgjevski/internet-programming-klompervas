import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = 'filip-gjorgjevski-5349-aspf8fd2cyky-33fb49';

  const clonedRequest = req.clone({
    setHeaders: {
      'x-api-key': apiKey
    }
  });

  return next(clonedRequest);
};