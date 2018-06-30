import { EMimeType } from './mimeTypes.type';

/**
 * @description Will be created from request to POST:/file/convert controller.
 */
export interface IFileUploadResponseDTO {
    /** File name string */
    name: string;
    /** File size in bytes */
    size: number;
    /** File data format */
    mimeType: string;
    /** Array of mimetypes this file can be converted to */
    availableConversionMimeTypes: EMimeType[];
}

export class FileUploadResponse implements IFileUploadResponseDTO {

    public name: string;
    public size: number;
    public mimeType: string;
    public availableConversionMimeTypes: EMimeType[];

    constructor() {
        this.name = null;
        this.size = null;
        this.mimeType = null;
        this.availableConversionMimeTypes = null;
    }
}