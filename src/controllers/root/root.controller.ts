import {
    Get,
    Controller,
} from '@nestjs/common';

@Controller()
export class RootController {

    /**
     * @description root path
     * @returns {object}
     */
    @Get()
    public root(
    ): void {

        // console.log( '!!!! ROOT req.body:', req.body );

        // // serve public index.html
        // return res.sendFile( '/' );

    }

}
