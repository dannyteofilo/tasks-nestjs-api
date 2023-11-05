import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogginInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/tasks'),
    AuthModule,
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LogginInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
