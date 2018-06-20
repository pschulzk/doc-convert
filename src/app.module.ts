/** NestJS imports */
import { Module } from '@nestjs/common';

/** Services */
import {
    ConverterService,
} from './services';

/** Controllers */
import {
    RootController,
    ConverterController,
} from './controllers';

/** Module */
@Module({
    imports: [],
    controllers: [
        RootController,
        ConverterController,
    ],
    providers: [
        ConverterService,
    ],
})
export class AppModule {}
