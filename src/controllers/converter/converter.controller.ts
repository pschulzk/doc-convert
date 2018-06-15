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
    RequestContentDto,
} from '../../types';

import {
    CommonUtils,
} from '../../utils';

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
    constructor() {
        super();
    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description recieve conversion request data and provide response
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
        // console.log( '!!! FILE:', file );

        const requestContentDto: RequestContentDto
            = new RequestContentDto( file.path, targetMimeType );

        const response: object = {
            data: {
                requestResponse: requestContentDto.getResponse(),
            },
        };

        return response;
    }
}
