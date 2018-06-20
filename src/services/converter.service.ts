/** NEST imports */
import {
    Injectable,
} from '@nestjs/common';

/** NodeJS imports */
import * as FS from 'fs';

/** 3rd party imports */
import * as XLSX from 'xlsx';

/** Custom imports */
import { IConversionRequest } from '../types';

/**
 * @description Service for creating and managing ConversionRequests
 */
@Injectable()
export class ConverterService {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public conversionRequest: IConversionRequest = {
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
     * @returns {IConversionRequest} object containing requested information
     */
    public createConversion(
        sourceFilePath: string,
        targetMimetype: string,
        targetFolderPath: string,
    ): IConversionRequest {

        // assign response properties
        this.conversionRequest.sourceFilePath = sourceFilePath;
        this.conversionRequest.targetMimetype = targetMimetype;

        // extract file name from sourceFilePath
        const fileName: string = sourceFilePath.split( '/' ).pop();
        // define new file path to target folder
        this.conversionRequest.targetFilePath = targetFolderPath + fileName;
        // console.log( '!!! conversionRequest.targetFilePath:', this.conversionRequest.targetFilePath );

        // read file from source
        this.readFile( this.conversionRequest.sourceFilePath )
            .then( ( uploadedFile ) => {

                // save read file to path
                this.writeFile(
                    this.conversionRequest.targetFilePath,
                    this.convertFile( uploadedFile ), // actually convert file
                );
            });

        // // check object for completion
        // Object.getOwnPropertyNames( this.conversionRequest )
        //     .forEach( (property: string) => {
        //         if ( this.conversionRequest[ property ] === null ) {
        //             console.warn( 'conversionRequest incomplete:', this.conversionRequest );
        //         }
        //     });

        return this.conversionRequest;
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
                            console.error( 'ConverterService.readFile::FS.readFile:', error ),
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
     * @param {Buffer} file
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
                        reject( console.error( 'ConverterService.convertFile:', error ) );
                    } else {
                        console.log( 'ConverterService.convertFile: SUCCESS' );
                        resolve();
                    }
                },
            );
        });
    }

}
