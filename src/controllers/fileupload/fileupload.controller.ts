import {
    Get,
    Controller,
    Request,
    Response,
} from '@nestjs/common';

@Controller( 'file/upload' )
export class FileUploadController {

    /**
     * @description root path
     * @returns {object}
     */
    @Get()
    public async upload(
        @Request() req,
        @Response() res,
    ): any {

        console.log( '!!!! UPLOAD req:', req );

        return null;

    }

}
