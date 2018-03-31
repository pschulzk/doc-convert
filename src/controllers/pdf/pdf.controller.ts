/** NEST imports */
import {
    Controller,
    Body,
    Post,
    FileInterceptor,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    IRequestContentDto,
    RequestContentDto,
    IResponseContentDto,
    EConversionFormats,
} from '../../types';

import { ConversionController } from '../../classes';

@Controller('to-pdf')
export class PdfController extends ConversionController {

    @Post()
    @UseInterceptors( FileInterceptor('file') )
    public async upload(@UploadedFile() file) {
        const requestContentDto: RequestContentDto
            = new RequestContentDto( EConversionFormats.PDF, file );

        // console.log('requestContentDto:', requestContentDto );

        // return {
        //     data: 'SUCCESS',
        //     req: createResponseContentDto,
        // };
    }
}
