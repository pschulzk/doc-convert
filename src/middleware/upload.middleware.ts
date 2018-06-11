import {
    Injectable,
    NestMiddleware,
} from '@nestjs/common';

import * as multer from 'multer';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
        const upload = multer({ dest: './uploads/' });
        return upload.any();
    }
}
