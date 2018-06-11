/** NEST imports */
import {
    Controller,
    Get,
    Post,
    // FileInterceptor,
    // UseInterceptors,
    // UploadedFile,
} from '@nestjs/common';

/** CUSTOM imports */
import {
    EConversionFormats,
    // RequestContentDto,
    // ResponseContentDto,
} from '../types';

/**
 * @description
 * Defines available formats from and to convert to
 *
 */

export abstract class AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------

    // /**
    //  * @description inform about that this request is not available
    //  * @returns {object}
    //  */
    // @Get()
    // public default(): object {
    //     const infoMessage: string
    //         = 'No GET request available. POST document of type HTML, PDF or DOCX.';

    //     return {
    //         data: {
    //             message: infoMessage,
    //         },
    //     };
    // }

}
