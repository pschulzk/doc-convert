import { EMimeType } from './mimeTypes.type';

/**
 * @description Will be requested to POST:/file/convert controller.
 */
export interface IFileConvertRequestDTO {
    /** URI to original file */
    sourceFilePath: string;
    /** Data format to original file */
    sourceMimetype: EMimeType;
    /** Data format of converted file */
    targetMimetype: EMimeType;
}

export class FileConvertRequest implements IFileConvertRequestDTO {

    public sourceFilePath: string;
    public sourceMimetype: EMimeType;
    public targetMimetype: EMimeType;

    constructor() {
        this.sourceFilePath = null;
        this.sourceMimetype = null;
        this.targetMimetype = null;
    }
}

/**
 * @description Will be created from request to POST:/file/convert controller.
 */
export interface IFileConvertResponseDTO extends IFileConvertRequestDTO {
    /** URI of converted file */
    targetFilePath: string;
}

export class FileConvertResponse implements IFileConvertResponseDTO {

    public sourceFilePath: string;
    public sourceMimetype: EMimeType;
    public targetMimetype: EMimeType;
    public targetFilePath: string;

    constructor() {
        this.sourceFilePath = null;
        this.sourceMimetype = null;
        this.targetMimetype = null;
        this.targetFilePath = null;
    }
}