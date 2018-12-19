import {Global, Module} from '@nestjs/common';

import Logger from 'bunyan';
import {Clock, ServerClock} from '@app/shared/clock';
import {ConfigService} from '@app/shared/config.service';
import {CustomNestLogger} from '@app/shared/logger.service';
import {FactoryProvider} from '@nestjs/common/interfaces';

const clockProvider = {
    provide: Clock,
    useValue: new ServerClock()
};

const bunyanProvider: FactoryProvider = {
    provide: Logger,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const level = configService.config.get('logging.level');
        return Logger.createLogger({
            name: 'twp',
            level: level
        });
    }
};

@Global()
@Module({
    providers: [ConfigService, clockProvider, bunyanProvider, CustomNestLogger],
    exports: [ConfigService, clockProvider, bunyanProvider, CustomNestLogger]
})
export class SharedModule {
}
