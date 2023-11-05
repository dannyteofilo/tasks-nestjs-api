import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTPP');
  intercept(contex: ExecutionContext, next: CallHandler): Observable<any> {
    const req = contex.switchToHttp().getRequest();

    this.logger.log(`Request ${req.method} ${req.url}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Response ${req.method} ${Date.now() - now}ms`);
      }),
    );
  }
}
