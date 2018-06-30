/** NEST imports */
import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    IFileConvertRequestDTO,
    IFileConvertResponseDTO,
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
        protected convertService: ConvertService,
    ) {
        super();
    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description Recieve conversion request data and provide response
     * @param {any} request Request.body shall be in form of IFileConvertRequestDTO
     * @param {string}
     * the converted file to be of.
     * @returns {Promise<any>}
     */
    @Post()
    @HttpCode( HttpStatus.OK )
    public async convert(
        @Request() request,
    ): Promise<any> {

        const fileConvertRequest: IFileConvertRequestDTO = this.convertService
            .createFileConvertRequest( request );

        // convert uploaded and stored file
        return this.convertService
            .createFileConvertResponse(
                fileConvertRequest,
                this.downloadPath,
            )
            .then( (reponse: IFileConvertResponseDTO) => {
                // create response
                return reponse;
            });
    }
}
