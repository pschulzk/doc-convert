import {
    Get,
    Controller,
    Request,
    Response,
} from '@nestjs/common';

@Controller( 'download' )
export class DownloadController {

    /**
     * @description root path
     * @returns {object}
     */
    @Get()
    public root(
        @Request() req,
        @Response() res,
    ): object {

        console.log( '!!!! DOWNLOAD req:', req );

        res.setHeader('Content-Disposition', 'attachment; filename="filename.jpg"' );

        // serve public index.html
        return res.sendFile( '/' );

    }

}
