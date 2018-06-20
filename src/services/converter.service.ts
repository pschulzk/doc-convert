/** NEST imports */
import {
    Injectable,
} from '@nestjs/common';

/** NodeJS imports */
import * as PATH from 'path';
import * as FS from 'fs';

/** 3rd party imports */
import * as XLSX from 'xlsx';

/** Custom imports */
import { IConversion } from '../types';

/**
 * @description Service for creating and managing ConversionRequests
 */
@Injectable()
export class ConverterService {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public conversionRequest: IConversion = {
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

        // assign response properties
        this.conversionRequest.sourceFilePath = sourceFilePath;
        // extract file name from sourceFilePath
        const fileName: string = sourceFilePath.split( '/' ).pop();

        this.conversionRequest.sourceMimetype = PATH.extname( fileName );
        this.conversionRequest.targetMimetype = targetMimetype;

        // read file from source
        return this.readFile( this.conversionRequest.sourceFilePath )
            .then( ( uploadedFile ) => {
                // convert file
                return this.convertFile(
                    uploadedFile,
                    this.conversionRequest.targetMimetype,
                );
            })
            .then( (convertedFile: Buffer) => {
                // save read file to path
                return this.writeFile(
                    targetFolderPath + fileName,
                    convertedFile,
                );
            })
            .then( () => {
                // // check object for completion
                // Object.getOwnPropertyNames( this.conversionRequest )
                //     .forEach( (property: string) => {
                //         if ( this.conversionRequest[ property ] === null ) {
                //             console.warn( 'conversionRequest incomplete:', this.conversionRequest );
                //         }
                //     });

                // get new file path to target folder
                this.conversionRequest.targetFilePath = targetFolderPath + fileName;

                // return final response
                return this.conversionRequest;
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

    /**
     * @description read file from filesystem
     *
     * @param {string} filePath filesystem path to file
     * @return {Promise<Buffer>} Asynchronous file buffer
     */
    public readFile(
        filePath: string,
    ): Promise<Buffer> {
        return new Promise( ( resolve, reject ) => {
            FS.readFile(
                filePath,
                ( error: Error, data: Buffer ) => {
                    if ( error ) {
                        reject(
                            new Error(
                                'ConverterService.readFile(): Cannot read file from: '
                                + filePath,
                            ),
                        );
                    } else if ( data ) {
                        return resolve( data );
                    }
                },
            );
        });
    }

    /**
     * @description write file to filesystem
     *
     * @param {string} targetFilePath filesystem target path to folder
     * @param {Buffer} file buffer to write to filesystem
     * @return {Promise<void>} Resolve when done writing file
     */
    public writeFile(
        targetFilePath: string,
        file: Buffer,
    ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
            FS.writeFile(
                targetFilePath,
                file,
                ( error: Error ) => {
                    if ( error ) {
                        reject(
                            new Error(
                                'ConverterService.writeFile: Cannot write file to path: '
                                + targetFilePath,
                            ),
                        );
                    } else {
                        // console.log( 'ConverterService.writeFile: SUCCESS' );
                        resolve();
                    }
                },
            );
        });
    }

}
