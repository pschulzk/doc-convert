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
     * @description Assign objects and check for property safety.
     * Needs object's properties to bee initialized with value of at least null.
     * @param {any} request Request with conform request body
     * @param {T} object Initialized class object with iteratable property values
     * @returns {T} object assigned with request body's property values
     */
    public static getObjectFromDTO<T>(
        request: any,
        object: T,
    ): T {
        // get request body
        let requestBody;
        if ( request.body ) {
            requestBody = request.body;
        } else {
            throw new Error(
                'CommonUtils.getObjectFromDTO(): Request has no body: ' + request,
            );
        }

        // Get and assign properties
        const returnValue: any = {};
        Object.getOwnPropertyNames( object ).forEach( (key: string) => {
            if ( requestBody[ key ] ) {
                Object.assign( returnValue, { [ key ]: requestBody[ key ] } );
            } else {
                throw new Error(
                    'CommonUtils.getObjectFromDTO(): Request.body is missing property: ' + key,
                );
            }
        });

        return returnValue as T;
    }

    /**
     * @description Check object for allowed property values
     *
     * @param {object} object Object to be checked
     * @return {boolean} If true, no property values is null or undefined
     */
    public static checkObjectValues( object: object ): boolean {
        return Object.getOwnPropertyNames( object )
            // If no value is null or undefined, return true
            .map( (property: string) => {
                if (
                    typeof object[ property ] === 'undefined'
                    || object[ property ] === null
                ) {
                    throw new Error(
                        'Object property value not allowed:'
                        + property,
                    );
                } else {
                    return true;
                }
            })
            .some( (arrVal: boolean) => ( arrVal === true ) );
    }

    /**
     * @description Read file from filesystem
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
     * @description Write file to filesystem
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
