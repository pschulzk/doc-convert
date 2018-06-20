/** NodeJS imports */
import * as FS from 'fs';

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

    /**
     * @description read file from filesystem
     *
     * @param {string} filePath filesystem path to file
     * @return {Promise<Buffer>} Asynchronous file buffer
     */
    public static readFile(
        filePath: string,
    ): Promise<Buffer> {
        return new Promise( ( resolve, reject ) => {
            FS.readFile(
                filePath,
                ( error: Error, data: Buffer ) => {
                    if ( error ) {
                        reject( new Error(
                            'CommonUtils.readFile(): Cannot read file from: '
                            + filePath
                            + ', error: '
                            + error,
                        ));
                    } else if ( data ) {
                        return resolve( data );
                    }
                },
            );
        });
    }

    /**
     * @description write file to filesystem
     *
     * @param {string} targetFilePath filesystem target path to folder
     * @param {Buffer} file buffer to write to filesystem
     * @return {Promise<void>} Resolve when done writing file
     */
    public static writeFile(
        targetFilePath: string,
        file: Buffer,
    ): Promise<void> {
        return new Promise( ( resolve, reject ) => {
            FS.writeFile(
                targetFilePath,
                file,
                ( error: Error ) => {
                    if ( error ) {
                        reject( new Error(
                            'CommonUtils.writeFile: Cannot write file to path: '
                            + targetFilePath
                            + ', error: '
                            + error,
                        ));
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

}
