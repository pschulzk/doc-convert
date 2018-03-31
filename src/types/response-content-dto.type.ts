import { EConversionFormats } from './conversion-formats.type';

/**
 *
 * Defines the reponse to POST:/convert path
 *
 */

export interface IResponseContentDto {
    /** file format of document sent */
    sourceFormat: EConversionFormats;
    /** desired format to be returned */
    targetFormat: EConversionFormats;
    /** download URI of original document file */
    sourceDownloadUrl: URL;
    /** download URI of requested document file */
    targetDownloadUrl: URL;
}
