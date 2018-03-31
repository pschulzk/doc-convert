import { EConversionFormats } from './conversion-formats.type';

/**
 *
 * Will be created from request to POST:/convert path
 *
 */

export interface IRequestContentDto {
    /** file format of document sent */
    sourceFormat: any;
    /** desired format to be returned */
    targetFormat: EConversionFormats;
    /** download URI of original document file */
    requestFile: IRequestFile;
}

export interface IRequestFile {
    originalname: string;
    mimetype: string;
    size: number;
}

export class RequestContentDto implements IRequestContentDto {

    public sourceFormat: any;

    public targetFormat: EConversionFormats;

    public requestFile: IRequestFile = {
        originalname: null,
        mimetype: null,
        size: null,
    };

    constructor( targetFormat: EConversionFormats, file: any ) {
        this.targetFormat = targetFormat;
        this.sourceFormat = this._detectFormat( file.mimetype );
        this.requestFile.originalname = file.originalname;
        this.requestFile.size = file.size;
        this.requestFile.mimetype = file.mimetype;
    }

    private _detectFormat( v: string ): EConversionFormats {
        if ( RegExp( /doc/g, 'i' ).test( v ) ) {
            return EConversionFormats.DOCX;
        } else
        if ( RegExp( /html/g, 'i' ).test( v ) ) {
            return EConversionFormats.HTML;
        } else
        if ( RegExp( /pdf/g, 'i' ).test( v ) ) {
            return EConversionFormats.PDF;
        } else
        if ( RegExp( /text/g, 'i' ).test( v ) ) {
            return EConversionFormats.TEXT;
        } else {
            throw new Error( 'RequestContentDto._detectFormat: Incompatible Format!' );
        }
    }
}
