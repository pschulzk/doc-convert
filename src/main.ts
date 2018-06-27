import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const appPort: number = 3000;
const appRoot = process.env.PWD;
const publicPath: string = appRoot + '/public';
const downloadPath: string = appRoot + '/download';

async function bootstrap() {
    const app = await NestFactory.create( AppModule );

    // serve static files for frontend
    app.useStaticAssets( publicPath );
    // serve static files for downloads
    app.useStaticAssets( downloadPath, {
        index: false,
        setHeaders: ( response ) => {
            response.setHeader( 'Content-Disposition', 'attachment' );
        },
    });

    await app.listen( appPort );
}
bootstrap();
