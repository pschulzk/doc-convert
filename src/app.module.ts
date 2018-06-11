import { Module } from '@nestjs/common';

import {
  RootController,
  ConverterController,
} from './controllers';

import {
  ConverterService,
} from './services';

@Module({
  // imports: [],
  controllers: [
    RootController,
    ConverterController,
  ],
  providers: [ ConverterService ],
  // components: [],
})
export class AppModule {}
