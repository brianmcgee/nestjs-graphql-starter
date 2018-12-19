import { Injectable, LoggerService } from '@nestjs/common';
import Logger from 'bunyan';

@Injectable()
export class CustomNestLogger implements LoggerService {

	constructor(readonly logger: Logger) {}

	error(message: any, trace?: string, context?: string): any {
		this.logger.error({ context, trace }, message);
	}

	log(message: any, context?: string): any {
		this.logger.info({ context }, message);
	}

	warn(message: any, context?: string): any {
		this.logger.warn({ context }, message);
	}

}
