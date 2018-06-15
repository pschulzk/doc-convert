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
export class ConversionRequestService {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public conversionRequest: IConversionRequest = {
        sourceMimetype: null,
        targetMimetype: null,
        sourceFilePath: null,
        targetFilePath: null,
    };

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor() {

    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    /**
     * @description Get response assembled from object properties.
     * @returns {object} response JSON
     */
    public createConversion( sourceFilePath: string, targetMimetype: string ): IConversionRequest {

        this.conversionRequest.sourceFilePath = sourceFilePath;
        this.conversionRequest.targetMimetype = targetMimetype;

        // check object for completion
        Object.getOwnPropertyNames( this.conversionRequest )
            .forEach( (property: string) => {
                if ( this.conversionRequest[ property ] === null ) {
                    console.warn( 'conversionRequest incomplete:', this.conversionRequest );
                }
            });

        this.readFile( sourceFilePath );

        return this.conversionRequest;
    }

    public convertFile( filePath: string ): Buffer {

        const data = this.readFile( filePath );

        // const workbook = XLSX.read( data, { type: 'buffer' } );

        /* generate workbook */
        const test: any[][] = [ [ 1, 2, 3 ], [ 1, 2, 3 ], [ 1, 2, 3 ] ];
        const worksheet = XLSX.utils.aoa_to_sheet(test);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet( workbook, worksheet, 'SheetJS' );

        /* generate buffer */
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' } );
    }

    public async readFile( filePath: string ): Promise<any> {
        return await FS.readFile(
            filePath,
            ( error: Error, data: Buffer ) => {
                if ( error ) {
                    console.error( 'ConversionRequestService.readFile:', error );
                } else if ( data ) {
                    console.log( 'ConversionRequestService.readFile:', data );
                    return data;
                }
            },
        );
    }

}
