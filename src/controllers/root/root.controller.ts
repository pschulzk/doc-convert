import { Get, Controller } from '@nestjs/common';

@Controller()
export class RootController {

    /**
     * @description root path
     * @returns {object}
     */
    @Get() public root(): object {
        return {
            data: 'test',
        };

    }

}
