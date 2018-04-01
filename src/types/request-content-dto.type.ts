import { EConversionFormats } from './conversion-formats.type';

/**
 *
 * Will be created from request to POST:/convert path
 *
 */

export interface IRequestContentDto {
    /** file format of document sent */
    sourceMimetype: any;
    /** desired format to be returned */
    targetMimetype: EConversionFormats;
    /** download URI of original document file */
    requestFile: IRequestFile;
}

export interface IRequestFile {
    originalname: string;
    mimetype: string;
    size: number;
}

export class RequestContentDto implements IRequestContentDto {

    public sourceMimetype: any;

    public targetMimetype: EConversionFormats;

    public requestFile: IRequestFile = {
        originalname: null,
        mimetype: null,
        size: null,
    };

    constructor( targetMimetype: EConversionFormats, file: any ) {
        // console.log('RequestContentDto.file:', file);
        
        this.targetMimetype = targetMimetype;
        this.sourceMimetype = this._detectFormat( file.mimetype );
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
