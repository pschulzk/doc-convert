/** NestJS imports */
import { Module } from '@nestjs/common';

/** Services */
import {
    ConvertService,
} from './services';

/** Controllers */
import {
    RootController,
    FileConvertController,
    // DownloadController,
} from './controllers';

/** Module */
@Module({
    imports: [],
    controllers: [
        RootController,
        FileConvertController,
        // DownloadController,
    ],
    providers: [
        ConvertService,
    ],
})
export class AppModule {}
