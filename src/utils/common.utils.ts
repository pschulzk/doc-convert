/**
 * @description Collection of custom NodeJS backend utilities.
 */
export class CommonUtils {

    /**
     * @description Generate a 32 random chars long string indentifier.
     * @returns {string} unique file name
     */
    public static getUniqueId(): string {
        return Array(32)
            .fill( null )
            .map( () => ( Math.round( Math.random() * 16 ) ).toString( 16 ) ).join( '' );
    }
}
