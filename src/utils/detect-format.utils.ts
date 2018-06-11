import { EConversionFormats } from '../types';

/**
 *
 * Detect whether File is of format
 *
 */
export class DetectFormatUtils {

    public static detectFormat( v: string ): EConversionFormats {

        Object.keys( EConversionFormats )
            .forEach( (key, index, value) => {
                return ! isNaN(Number( EConversionFormats[key] ));
        });

        if ( RegExp( /docx/g, 'i' ).test( v ) ) {
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
        }
        if ( RegExp( /odt/g, 'i' ).test( v ) ) {
            return EConversionFormats.ODT;
        } else {
            throw new Error( 'RequestContentDto._detectFormat: Incompatible Format!' );
        }
    }
}