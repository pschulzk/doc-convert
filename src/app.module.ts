import { Module } from '@nestjs/common';

import {
  RootController,
  ConverterController,
} from './controllers';

@Module({
  imports: [],
  controllers: [
    RootController,
    ConverterController,
  ],
  providers: [],
})
export class AppModule {}
