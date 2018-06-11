import {
    Injectable,
} from '@nestjs/common';

@Injectable()
export class ConverterService {

    constructor() {

    }

    public convert( file: any ): any {
        // console.log( '!!! ConverterService:', file );
        return file;
    }
}
