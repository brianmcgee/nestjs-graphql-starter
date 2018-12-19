import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {SharedModule} from '@app/shared/shared.module';
import {GraphQLModule} from '@app/graphql/graphql.module';
import {OrmModule} from '@app/orm/orm.module';
import {AuthModule} from '@app/auth/auth.module';
import {UserModule} from '@app/user/user.module';

import Cors from 'cors';
import helmet from 'helmet';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import {ConfigService} from "@app/shared/config.service";

@Module({
    imports: [
        SharedModule,
        GraphQLModule,
        OrmModule,
        AuthModule,
        UserModule
    ]
})
export class AppModule implements NestModule {

    constructor(private readonly configService: ConfigService){}

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        this.configureCors(consumer);
        this.configureHelmet(consumer);
        this.configureCsurf(consumer);
        this.configureRateLimiter(consumer);
    }

    private configureCors(consumer: MiddlewareConsumer) {
        // set cors headers
        consumer
            .apply(Cors())
            .forRoutes('*');
    }

    private configureHelmet(consumer: MiddlewareConsumer) {
        consumer.apply(helmet());
    }

    private configureCsurf(consumer: MiddlewareConsumer) {
        consumer.apply(csurf());
    }

    private configureRateLimiter(consumer: MiddlewareConsumer) {
        consumer.apply(rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 200 // limit each IP to 200 requests per windowMs
        }))
    }
}
