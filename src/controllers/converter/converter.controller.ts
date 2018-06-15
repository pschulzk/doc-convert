/** NEST imports */
import {
    Controller,
    FileInterceptor,
    Post,
    Response,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

/** NodeJS imports */
import * as FS from 'fs';
import * as PATH from 'path';
import { diskStorage } from 'multer';

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
     * @returns {Promise<any>}
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
        @Response() res,
    ): Promise<any> {

        console.log( 'FILEPATH:', file.path );
        

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

        // res.set('Content-Type', 'application/vnd.ms-excel');
        // res.setHeader('Content-Disposition', 'attachment; filename="test.xlsx"');
        // const filestream = FS.createReadStream(
        //     this.conversionRequestService
        //         .convertFile( conversionRequest.sourceFilePath ),
        // );
        // filestream.pipe(res);

        // return res.send(
        //     this.conversionRequestService
        //         .convertFile( conversionRequest.sourceFilePath ),
        // );
    }
}
