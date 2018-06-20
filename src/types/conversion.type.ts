/**
 * @description Will be created from request to POST:/file/convert controller.
 */
export interface IConversion {
    sourceMimetype: string;
    targetMimetype: string;
    sourceFilePath: string;
    targetFilePath: string;
}
