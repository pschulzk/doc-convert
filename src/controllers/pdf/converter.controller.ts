/** NEST imports */
import {
    Controller,
    // Get,
    Post,
    FileInterceptor,
    UseInterceptors,
    UploadedFile,
    Query,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    RequestContentDto,
    ResponseContentDto,
    EConversionFormats,
} from '../../types';

import { AbstractController } from '../../classes';

@Controller('convert')
export class ConverterController extends AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

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
    public async upload(
        @UploadedFile() file: File,
        @Query( 'targetMimeType' ) targetMimeType: EConversionFormats,
    ): Promise<object> {

        const requestContentDto: RequestContentDto
            = new RequestContentDto( file, targetMimeType );

        const response: object = {
            data: {
                requestResponse: requestContentDto.getResponseContentDto(),
            },
        };

        return response;
    }
}
