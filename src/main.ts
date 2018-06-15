import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const appRoot = process.env.PWD;
const publicPath: string = appRoot + '/public';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // serve static files
    app.useStaticAssets( publicPath );

    await app.listen(3000);
}
bootstrap();
