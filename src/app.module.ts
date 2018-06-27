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
    // DownloadController,
} from './controllers';

/** Module */
@Module({
    imports: [],
    controllers: [
        RootController,
        ConverterController,
        // DownloadController,
    ],
    providers: [
        ConverterService,
    ],
})
export class AppModule {}
