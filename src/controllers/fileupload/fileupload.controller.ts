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
    EMimeType,
    IFileUploadResponseDTO,
} from '../../types';

import {
    CommonUtils,
} from '../../utils';

import {
    ConvertService,
} from '../../services';

import { AbstractController } from '../../classes';

@Controller( 'file/upload' )
export class FileUploadController  extends AbstractController{

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** relative filesystem path where to store uploads from this controller */
    public uploadPath: string = './upload';

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor(
        // protected convertService: ConvertService,
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
                destination: './upload',
                filename: (req, file, cb) => {
                    const fileName: string = PATH.parse(file.originalname).name;
                    const fileExtension: string = PATH.parse(file.originalname).ext;
                    const uniqueId: string = CommonUtils.getUniqueId();
                    // const fileIdentifier: string = `${fileName}-${uniqueId}${fileExtension}`;
                    const fileIdentifier: string = file.originalname;

                    cb( null, fileIdentifier );
                },
            }),
        }),
    )
    @HttpCode( HttpStatus.OK )
    public async upload(
        @UploadedFile() file,
        @Request() request,
    ): Promise<IFileUploadResponseDTO> {

        const fileUploadResponse: IFileUploadResponseDTO = {
            name: file.filename,
            size: file.size,
            mimeType: file.mimetype,
            availableConversionMimeTypes: [
                EMimeType.PDF,
                EMimeType.XLSX,
            ],
        };

        return Promise.resolve( fileUploadResponse );

    }

}
