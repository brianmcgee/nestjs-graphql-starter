import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

import {useContainer} from "class-validator";
import {CustomNestLogger} from '@app/shared/logger.service';
import {ConfigService} from '@app/shared/config.service';


declare const module: any;

async function bootstrap() {

    const app = await NestFactory.create(AppModule, { logger: false });
    app.useLogger(app.get(CustomNestLogger));

    // This will cause class-validator to use the nestJS module resolution,
    // the fallback option is to spare ourselves from importing all the class-validator modules to nestJS
    useContainer(app, { fallbackOnErrors: true });

    const config = app.get(ConfigService);
    let { host, port } = config;

    await app.listen(port, host);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
