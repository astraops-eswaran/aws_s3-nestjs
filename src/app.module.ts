import { Module } from '@nestjs/common';
import { FileModule } from './fileupload/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    FileModule
  ],
})
export class AppModule {}
