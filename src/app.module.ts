/** NestJS imports */
import { Module } from '@nestjs/common';

/** Services */
import {
    ConversionRequestService,
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
        ConversionRequestService,
    ],
})
export class AppModule {}
