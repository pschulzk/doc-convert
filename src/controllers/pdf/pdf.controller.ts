/** NEST imports */
import {
    Inject,
    Controller,
    Get,
    Post,
    FileInterceptor,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    RequestContentDto,
    ResponseContentDto,
    EConversionFormats,
} from '../../types';

import { ConversionController } from '../../classes';

@Controller('to-pdf')
export class PdfController extends ConversionController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------
     public targetMimetype: EConversionFormats = EConversionFormats.PDF;

     /** -------------------------------------------------------------------------------------------
      * CONSTRUCTOR
      */ // ----------------------------------------------------------------------------------------
     constructor() {
         super();
     }

    /**
     * @description recieve conversion request data and provide response
     * @returns {object}
     */
    @Post()
    @UseInterceptors( FileInterceptor('file') )
    public async upload(@UploadedFile() file): Promise<object> {
        const requestContentDto: RequestContentDto
            = new RequestContentDto( EConversionFormats.PDF, file );

        const responseContentDto: ResponseContentDto = new ResponseContentDto();
        responseContentDto.sourceMimetype = requestContentDto.sourceMimetype;
        responseContentDto.targetMimetype = requestContentDto.targetMimetype;

        return {
            data: {
                requestResponse: responseContentDto,
            },
        };
    }
}
