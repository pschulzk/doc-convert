/** NEST imports */
import {
    Injectable,
} from '@nestjs/common';

/** 3rd party imports */
import * as Mime from 'mime-types';
// import * as XLSX from 'xlsx';

/** Custom imports */
import {
    IFileConvertRequestDTO,
    FileConvertRequest,
    IFileConvertResponseDTO,
    FileConvertResponse,
    EMimeType,
} from '../types';

import {
    CommonUtils,
} from '../utils';

/**
 * @description Service for creating and managing ConversionRequests
 */
@Injectable()
export class ConvertService {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public fileConvertRequest: IFileConvertRequestDTO = new FileConvertRequest();

    public fileConvertResponse: IFileConvertResponseDTO = new FileConvertResponse();

    // /** -------------------------------------------------------------------------------------------
    //  * CONSTRUCTOR
    //  */ // ----------------------------------------------------------------------------------------
    // constructor() {

    // }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    public createFileConvertRequest( request: any ): IFileConvertRequestDTO {
        // Instantiate with null property values
        const fileConvertRequest: IFileConvertRequestDTO = new FileConvertRequest();
        // Assign request body data and return
        return CommonUtils.getObjectFromDTO<IFileConvertRequestDTO>( request, fileConvertRequest );
    }

    /**
     * @description Read file to convert, convert it, store it to specified path and return
     * object with requested information.
     *
     * @param {IFileConvertRequestDTO} fileConvertRequest Object containing required values
     * @param {string} targetFolderPath Filesystem target path to folder
     * @returns {IFileConvertResponseDTO} Object containing requested information
     */
    public createFileConvertResponse(
        fileConvertRequest: IFileConvertRequestDTO,
        targetFolderPath: string,
    ): Promise<IFileConvertResponseDTO> {

        // Examine request data:
        // Extract file name from source file URI
        const fileName: string = fileConvertRequest.sourceFilePath.split( '/' ).pop();
        const sourceMimetypeFromFileExtension = Mime.lookup( fileName );
        // Exchange file extension
        const convertedFileName: string = fileName.replace(
            Mime.extension( sourceMimetypeFromFileExtension ),
            Mime.extension( fileConvertRequest.targetMimetype ),
        );
        // Target file path string in local filesystem
        const systemSourceFilePath: string = fileConvertRequest.sourceFilePath;
        const systemTargetFilePath: string = targetFolderPath + convertedFileName;

        // Assign response property values
        this.fileConvertResponse.sourceFilePath = fileConvertRequest.sourceFilePath;
        this.fileConvertResponse.sourceMimetype = sourceMimetypeFromFileExtension;
        this.fileConvertResponse.targetMimetype = fileConvertRequest.targetMimetype;
        this.fileConvertResponse.targetFilePath = convertedFileName;

        // Read file from source
        return CommonUtils.readFile( systemSourceFilePath )
            .then( ( uploadedFile ) => {
                // Convert file
                return this.convertFile(
                    uploadedFile,
                    this.fileConvertResponse.targetMimetype,
                );
            })
            .then( ( convertedFile: Buffer ) => {
                // Save read file to path
                return CommonUtils.writeFile(
                    systemTargetFilePath,
                    convertedFile,
                );
            })
            .then( () => {
                // Check object for completion
                if ( CommonUtils.checkObjectValues( this.fileConvertResponse ) ) {
                    // Return final response
                    return this.fileConvertResponse;
                }
            })
            .catch( (error: any) => {
                throw new Error( 'ConvertService.createFileConvertResponse(): ' + error );
            });
    }

    /**
     * @description Convert a file to target file type
     *
     * @param {string} fileToConvert file to convert
     * @param {EMimeType} targetMimetype file type to convert to
     * @return {Promise<Buffer>} Asynchronous file buffer
     */
    public convertFile(
        fileToConvert: any,
        targetMimetype: EMimeType,
    ): Promise<Buffer> {

        return Promise.resolve( fileToConvert );

        // // CONVERT
        // const workbook = XLSX.read( data, { type: 'buffer' } );
        // /* generate workbook */
        // const test: any[][] = [ [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 2, 3 ] ];
        // const worksheet = XLSX.utils.aoa_to_sheet(test);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet( workbook, worksheet, 'SheetJS' );
    }

}
