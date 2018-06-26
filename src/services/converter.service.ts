/** NEST imports */
import {
    Injectable,
} from '@nestjs/common';

/** 3rd party imports */
import * as Mime from 'mime-types';
// import * as XLSX from 'xlsx';

/** Custom imports */
import { IConversion } from '../types';

import {
    CommonUtils,
} from '../utils';

/**
 * @description Service for creating and managing ConversionRequests
 */
@Injectable()
export class ConverterService {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public conversion: IConversion = {
        sourceMimetype: null,
        targetMimetype: null,
        sourceFilePath: null,
        targetFilePath: null,
    };

    // /** -------------------------------------------------------------------------------------------
    //  * CONSTRUCTOR
    //  */ // ----------------------------------------------------------------------------------------
    // constructor() {

    // }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description Read file to convert, convert it, store it to specified path and return
     * object with requested information.
     *
     * @param {string} sourceFilePath filesystem path to file}
     * @param {string} targetMimetype file type to convert to
     * @param {string} targetFolderPath filesystem target path to folder
     * @returns {IConversion} object containing requested information
     */
    public createConversion(
        sourceFilePath: string,
        targetMimetype: string,
        targetFolderPath: string,
    ): Promise<IConversion> {
        console.log( '!!! ConverterService.createConversion: sourceFilePath:', sourceFilePath );
        console.log( '!!! ConverterService.createConversion: targetMimetype:', targetMimetype );
        console.log( '!!! ConverterService.createConversion: targetFolderPath:', targetFolderPath );

        // assign response properties
        // extract file name from sourceFilePath
        const fileName: string = sourceFilePath.split( '/' ).pop();
        this.conversion.sourceFilePath = sourceFilePath;
        this.conversion.sourceMimetype = Mime.lookup( fileName );
        this.conversion.targetMimetype = targetMimetype;
        // conform filename extension
        const newFileName: string = fileName.replace(
            Mime.extension( this.conversion.sourceMimetype ),
            Mime.extension( this.conversion.targetMimetype ),
        );
        // assemble target file path with new extension
        this.conversion.targetFilePath = targetFolderPath + newFileName;

        // read file from source
        return CommonUtils.readFile( this.conversion.sourceFilePath )
            .then( ( uploadedFile ) => {
                // convert file
                return this.convertFile(
                    uploadedFile,
                    this.conversion.targetMimetype,
                );
            })
            .then( ( convertedFile: Buffer ) => {
                // save read file to path
                return CommonUtils.writeFile(
                    this.conversion.targetFilePath,
                    convertedFile,
                );
            })
            .then( () => {
                // check object for completion
                Object.getOwnPropertyNames( this.conversion )
                    .forEach( (property: string) => {
                        if ( this.conversion[ property ] === null ) {
                            throw new Error(
                                'Conversion property incomplete:'
                                + property,
                            );
                        }
                    });

                this.conversion.targetFilePath = newFileName;

                // return final response
                return this.conversion;
            });
    }

    /**
     * @description Convert a file to target file type
     *
     * @param {string} fileToConvert file to convert
     * @param {string} targetMimetype file type to convert to
     * @return {Promise<Buffer>} Asynchronous file buffer
     */
    public convertFile(
        fileToConvert: any,
        targetMimetype: string,
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
