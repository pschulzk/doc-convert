import { EConversionFormats } from './conversion-formats.type';
import { ResponseContentDto } from './response-content-dto.type';
import { UrlObject } from 'url';
import { DetectFormatUtils } from '../utils';

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
    /** original document file */
    requestFile?: File;
    /** download URI of original document file */
    requestFileUrl?: UrlObject;
}

export class RequestContentDto implements IRequestContentDto {

    public sourceMimetype: any;

    public targetMimetype: EConversionFormats;

    public requestFile: any;

    public convertedFile: any;

    public requestFileUrl: UrlObject;

    constructor( file: any, targetMimetype: EConversionFormats,  ) {
        this.requestFile = file;
        this.targetMimetype = targetMimetype;
        this.sourceMimetype = DetectFormatUtils.detectFormat( file.mimetype );
    }

    /** return value */
    public getResponseContentDto(): ResponseContentDto {
        const response: ResponseContentDto = new ResponseContentDto();
        response.sourceMimetype = this.sourceMimetype;
        response.targetMimetype = this.targetMimetype;
        response.convertedFile = this.convertedFile;
        return response;
    }

}
