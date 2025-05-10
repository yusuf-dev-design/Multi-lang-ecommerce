import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    console.log(`Incoming Request: ${req.method} ${req.url}`);

    return next.handle().pipe(
      tap(() => {
        console.log(`Request completed in ${Date.now() - now}ms`);
      })
    );
  }
}