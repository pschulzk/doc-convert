import { IConversionRequest } from '../types';

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

        return this.conversionRequest;
    }

}
