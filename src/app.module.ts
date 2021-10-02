import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserManagementModule } from './user-management/user-management.module';
import { HotelsApiModule } from './hotels-api/hotels-api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReservationsApiModule } from './reservations-api/reservations-api.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }),
    UsersModule,
    ReservationsModule,
    AuthModule,
    UserManagementModule,
    HotelsApiModule,
    ReservationsApiModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
