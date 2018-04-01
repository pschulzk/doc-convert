/** NEST imports */
import {
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
     * @returns {Promise<object>}
     */
    @Post()
    @UseInterceptors( FileInterceptor('file') )
    public async upload(@UploadedFile() file): Promise<object> {
        const requestContentDto: RequestContentDto
            = new RequestContentDto( this.targetMimetype, file );

        const responseContentDto: ResponseContentDto = new ResponseContentDto();
        responseContentDto.sourceMimetype = requestContentDto.sourceMimetype;
        responseContentDto.targetMimetype = requestContentDto.targetMimetype;

        const response: object = {
            data: {
                requestResponse: responseContentDto,
            },
        };

        return response;
    }
}
