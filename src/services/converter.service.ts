import {
    Injectable,
} from '@nestjs/common';

@Injectable()
export class ConverterService {

  constructor() {
    console.log( '!!! ConverterService' );
  }

  public convert(): string {
    return 'Hello World!';
  }
}
