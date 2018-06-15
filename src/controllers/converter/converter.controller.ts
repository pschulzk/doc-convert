/** NEST imports */
import {
    Controller,
    FileInterceptor,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

/** NodeJS imports */
import { diskStorage } from 'multer';

import * as PATH from 'path';

/** CUSTOM imports */
import {
    IConversionRequest,
} from '../../types';

import {
    CommonUtils,
} from '../../utils';

import {
    ConversionRequestService,
} from '../../services';

import { AbstractController } from '../../classes';

/**
 * @description
 * Recieves files, converts them and responds with location of those converted files.
 */
@Controller('file/convert')
export class ConverterController extends AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** relative filesystem path where to store uploads from this controller */
    public uploadPath: string = './uploads';

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor(
        protected conversionRequestService: ConversionRequestService,
    ) {
        super();
    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description recieve conversion request data and provide response
     * @param {any} file uploaded file
     * @param {string} targetMimeType the file type the requesting source wants
     * the converted file to be of.
     * @returns {Promise<object>}
     */
    @Post()
    @UseInterceptors(
        FileInterceptor( 'file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const fileName: string = PATH.parse(file.originalname).name;
                    const fileExtension: string = PATH.parse(file.originalname).ext;
                    const uniqueId: string = CommonUtils.getUniqueId();
                    const fileIdentifier: string = `${fileName}-${uniqueId}${fileExtension}`;

                    cb( null, fileIdentifier );
                },
            }),
        }),
    )
    public async upload(
        @UploadedFile() file,
        @Query( 'targetMimeType' ) targetMimeType: string,
    ): Promise<object> {

        // convert uploaded and stored file
        const conversionRequest: IConversionRequest = this.conversionRequestService
        .createConversion( file.path, targetMimeType );

        // create response
        const response: object = {
            data: {
                requestResponse: conversionRequest,
            },
        };

        // send response
        return response;
    }
}
