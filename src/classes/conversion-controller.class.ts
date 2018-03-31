import { Get, Controller } from '@nestjs/common';

/**
 * @description
 * Defines available formats from and to convert to
 *
 */

export abstract class ConversionController {

    /**
     * @description root path
     * @returns object
     */
    @Get() public default(): object {
        const infoMessage: string
            = 'No GET path available. POST document of type HTML, PDF or DOCX.';

        return {
            data: {
                message: infoMessage,
            },
        };
    }

}
