/** NEST imports */
import {
    Controller,
    FileInterceptor,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

/** NodeJS imports */
import * as PATH from 'path';
import { diskStorage } from 'multer';

/** CUSTOM imports */
import {
    IConversion,
} from '../../types';

import {
    CommonUtils,
} from '../../utils';

import {
    ConverterService,
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

    /** relative filesystem path where to store converted files for download */
    public downloadPath: string = './downloads/';

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor(
        protected converterService: ConverterService,
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
     * @returns {Promise<any>}
     */
    @Post()
    @UseInterceptors(
        FileInterceptor( 'file', {
            storage: diskStorage({
                destination: this.uploadPath,
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
    @HttpCode( HttpStatus.OK )
    public async upload(
        @UploadedFile() file,
        @Query( 'targetMimeType' ) targetMimeType: string,
    ): Promise<any> {

        // convert uploaded and stored file
        return this.converterService
            .createConversion(
                file.path,
                targetMimeType,
                this.downloadPath,
            )
            .then( (reponse: IConversion) => {
                // create response
                return {
                    data: reponse,
                };
            });
    }
}
