/** NestJS imports */
import { Module } from '@nestjs/common';

/** Services */
import {
    ConvertService,
} from './services';

/** Controllers */
import {
    RootController,
    FileUploadController,
    FileConvertController,
} from './controllers';

/** Module */
@Module({
    imports: [],
    controllers: [
        RootController,
        FileUploadController,
        FileConvertController,
    ],
    providers: [
        ConvertService,
    ],
})
export class AppModule {}
