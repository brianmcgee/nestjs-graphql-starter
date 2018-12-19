import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SnakeCaseNamingStrategy} from '@app/orm/config';
import {ConfigService} from '@app/shared/config.service';
import {ConnectionOptions} from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<ConnectionOptions> => ({
                type: 'postgres',
                url: configService.config.get('db.url'),
                synchronize: false,
                entities: ['src/**/**.entity{.ts,.js}'],
                namingStrategy: new SnakeCaseNamingStrategy(),
                logging: ['error']
            }),
            inject: [ConfigService]
        }),
    ],
})
export class OrmModule {
}
