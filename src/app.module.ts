import { Module } from '@nestjs/common';

import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';

import {
    FileUploadMiddleware,
} from './middleware';

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
    providers: [
        ConverterService,
    ],
    // components: [],
})
export class AppModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply([
            FileUploadMiddleware,
        ]).forRoutes(
            ConverterController,
        );
    }
}
