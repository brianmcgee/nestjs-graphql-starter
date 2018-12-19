import { Injectable } from '@nestjs/common';
import convict from 'convict';

const schema = {
    env: {
        doc: "The application environment.",
        format: ["production", "development", "staging", "test",],
        default: "development",
        env: "NODE_ENV"
    },
    host: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "0.0.0.0",
        env: "IP_ADDRESS",
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    logging: {
        level: {
            doc: 'Log level',
            env: 'LOG_LEVEL',
            default: 'info'
        }
    },
    db: {
        url: {
            doc: 'Postgres url',
            env: 'POSTGRES_URL',
            default: 'postgres://foo:bar@db/baz',
            sensitive: true
        }
    },
    jwt: {
        secret: {
            doc: "JWT secret",
            env: "JWT_SECRET",
            default: 'changeme',
            sensitive: true
        },
        expiresIn: {
            doc: "JWT expiry in seconds",
            env: "JWT_EXPIRES_IN",
            format: 'int',
            default: 7200
        }
    },
    graphql: {
        playground: {
            doc: 'Whether to enable to disable the graphql playground',
            env: "GRAPHQL_PLAYGROUND",
            default: false
        }
    }
};

export interface GraphqlConfig {
    playground: boolean;
}

export interface JwtConfig {
    secret: string;
    expiresIn: number;
}

@Injectable()
export class ConfigService {

	public config: convict.Config<any>;

	constructor() {
		const config = this.config = convict(schema);
		config.loadFile(`./config/${this.env}.json`);
        config.validate({ allowed: 'strict' });

        const { env } = this;

        if (env === 'development') {
            console.log('Configuration');
            console.log(config.toString());
        }

    }

	get env(): string {
		return this.config.get<string>('env');
	}

	get host(): string {
	    return this.config.get('host');
    }

    get port(): number {
        return +this.config.get('port')
    }

    get graphql(): GraphqlConfig {
	    return this.config.get('graphql');
    }

    get jwt(): JwtConfig {
	    return this.config.get('jwt');
    }

}
