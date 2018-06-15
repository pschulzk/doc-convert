/**
 * @description Will be created from request to POST:/file/convert controller.
 */
export class RequestContentDto {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    public sourceMimetype: string;

    public targetMimetype: string;

    public sourceFilePath: string;

    public targetFilePath: string;

    /** -------------------------------------------------------------------------------------------
     * CONSTRUCTOR
     */ // ----------------------------------------------------------------------------------------
    constructor( sourceFilePath: string, targetMimetype: string ) {
        this.sourceFilePath = sourceFilePath;
        this.targetMimetype = targetMimetype;
    }

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------
    /**
     * @description Get response assembled from object properties.
     * @returns {object} response JSON
     */
    public getResponse(): object {
        return {
            sourceFilePath: this.sourceFilePath,
            targetMimetype: this.targetMimetype,
        };
    }

}
