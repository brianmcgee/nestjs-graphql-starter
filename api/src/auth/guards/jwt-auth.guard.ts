import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {ConfigService} from '@app/shared/config.service';
import {AuthService} from '@app/auth/auth.service';

import * as jwt from 'jsonwebtoken';
import {JwtTokenDto} from '@app/auth/dto/jwt-token.dto';
import {UserEntity} from '@app/orm/entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private readonly jwtSecret: string;

    constructor(private readonly authService: AuthService,
                private readonly configService: ConfigService) {

        this.jwtSecret = configService.jwt.secret;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const gqlContext = GqlExecutionContext.create(context);

        // handles both normal controller based requests and graphql requests
        const request = context.switchToHttp().getRequest() || gqlContext.getContext().request;

        const token = request.headers.authorization
            ? (request.headers.authorization as string).split(' ')
            : null;

        if (token && token[1]) {

            const decoded: JwtTokenDto = jwt.verify(token[1], this.jwtSecret) as JwtTokenDto;
            const valid = await this.authService.validateUser(decoded);

            if(valid) {

                const user = new UserEntity({
                    id: decoded.sub,
                    ...decoded
                });

                // set the user on the context
                if(gqlContext.getContext()) {

                    gqlContext.getContext().user = user

                } else {
                    request.user = user;
                }

            }

            return valid;
        }

        return false;
    }

}
