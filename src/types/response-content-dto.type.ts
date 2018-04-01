import { EConversionFormats } from './conversion-formats.type';

/**
 *
 * Defines the reponse to POST:/convert path
 *
 */

export interface IResponseContentDto {
    /** file format of document sent */
    sourceMimetype: EConversionFormats;
    /** desired format to be returned */
    targetMimetype: EConversionFormats;
    /** download URI of original document file */
    sourceDownloadUrl: URL;
    /** download URI of requested document file */
    targetDownloadUrl: URL;
}

export class ResponseContentDto implements IResponseContentDto {

    public sourceMimetype: EConversionFormats;

    public targetMimetype: EConversionFormats;

    public sourceDownloadUrl: URL;

    public targetDownloadUrl: URL;
}
