import { Module } from '@nestjs/common';

import {
  RootController,
  PdfController,
} from './controllers';

@Module({
  imports: [],
  controllers: [
    RootController,
    PdfController,
  ],
  components: [],
})
export class AppModule {}
