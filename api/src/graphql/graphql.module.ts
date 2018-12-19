import {Module} from '@nestjs/common';

import {GraphQLModule as ApolloGraphQLModule, GqlModuleOptions} from '@nestjs/graphql';
import * as GraphQLJSON from 'graphql-type-json';
import {DateScalar} from './scalars/date.scalar';
import {join} from 'path';
import {ConfigService} from '@app/shared/config.service';

@Module({
    imports: [
        ApolloGraphQLModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<any> => {

                const config = configService.graphql;

                return {
                    typePaths: ['./src/**/*.graphql'],
                    resolvers: {JSON: GraphQLJSON},
                    cacheControl: true,
                    cors: true,
                    definitions: {
                        path: join(process.cwd(), 'src/graphql/schema.ts'),
                        outputAs: 'class'
                    },
                    context: ({ req, res }) => ({
                        request: req,
                        response: res
                    }),
                    ...config
                }
            },
            inject: [ConfigService]
        }),
    ],
    providers: [DateScalar]
})
export class GraphQLModule {

}
