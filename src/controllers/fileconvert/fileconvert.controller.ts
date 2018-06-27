/** NEST imports */
import {
    Controller,
    FileInterceptor,
    HttpCode,
    HttpStatus,
    Post,
    Request,
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
    ConvertService,
} from '../../services';

import { AbstractController } from '../../classes';

/**
 * @description
 * Recieves files, converts them and responds with location of those converted files.
 */
@Controller( 'file/convert' )
export class FileConvertController extends AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** relative filesystem path where to store uploads from this controller */
    public uploadPath: string = './upload';

    /** relative filesystem path where to store converted files for download */
    public downloadPath: string = './download/';

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor(
        protected ConvertService: ConvertService,
    ) {
        super();
    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description Recieve conversion request data and provide response
     * @param {any} file Uploaded file
     * @param {string} targetMimeType The file type the requesting source wants
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
        @Request() request,
    ): Promise<any> {

        // convert uploaded and stored file
        return this.ConvertService
            .createConversion(
                // provide path of file
                file.path,
                // provide data type to converted to
                request.body.targetMimeType,
                // static path to save converted file
                this.downloadPath,
            )
            .then( (reponse: IConversion) => {
                // create response
                return reponse;
            });
    }
}
