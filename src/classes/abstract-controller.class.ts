/** NEST imports */
import {
    Get,
} from '@nestjs/common';

/**
 * @description
 * Basic controller definition
 */
export abstract class AbstractController {

    /** -------------------------------------------------------------------------------------------
     * VARIABLES
     */ // ----------------------------------------------------------------------------------------

    /** -------------------------------------------------------------------------------------------
     * METHODS
     */ // ----------------------------------------------------------------------------------------
    /**
     * @description inform about that this request is not available
     * @returns {object}
     */
    @Get()
    public default(): object {
        const infoMessage: string
            = 'This controller is not sufficiently implemented.';

        return {
            data: {
                message: infoMessage,
            },
        };
    }

}
