/** NEST imports */
import {
    Controller,
    Post,
    FileInterceptor,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Query,
    Request,
    Res,
    Response,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    RequestContentDto,
    EConversionFormats,
} from '../../types';

import { AbstractController } from '../../classes';

import { ConverterService } from '../../services';

/** -----------------------------------------------------------------------------------------------
 * @brief   Endpoint dedicated for document conversion.
 */ // --------------------------------------------------------------------------------------------
@Controller('convert')
export class ConverterController extends AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** formalized POST request data */
    public requestContentDto: RequestContentDto;

     /** -------------------------------------------------------------------------------------------
      * CONSTRUCTOR
      */ // ----------------------------------------------------------------------------------------
     constructor(
        protected converterService: ConverterService,
     ) {
         super();
     }

    /**
     * @description recieve conversion request data and provide response
     * @returns {Promise<object>}
     */
    @Post()
    @UseInterceptors( FileInterceptor( 'file' ) )
    @HttpCode( HttpStatus.OK )
    public async upload(
        @Request() req: Request,
        @UploadedFile() file: File,
        @Res() response: Response,
        @Query( 'targetMimeType' ) targetMimeType?: EConversionFormats,
    ): Promise<object> {

        // set HTTP response headers
        // response.headers.set( 'Access-Control-Allow-Origin', '*' );

        this.requestContentDto = new RequestContentDto( file, targetMimeType );

        this.requestContentDto.convertedFile = this.converterService
            .convert( this.requestContentDto.requestFile );

        // const response: object = {
        //     data: {
        //         requestResponse: this.requestContentDto.getResponseContentDto(),
        //     },
        // };

        // console.log( '!!! RESPONSE:', response );

        return this.requestContentDto
            .getResponseContentDto()
            .convertedFile;
    }
}
