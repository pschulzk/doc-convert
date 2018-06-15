import {
    Get,
    Controller,
    Response,
} from '@nestjs/common';

@Controller()
export class RootController {

    /**
     * @description root path
     * @returns {object}
     */
    @Get()
    public root(
        @Response() res,
    ): object {

        // serve public index.html
        return res.sendFile( '/index.html' );

    }

}
