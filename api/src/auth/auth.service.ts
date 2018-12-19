import {Injectable} from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import * as jwt from 'jsonwebtoken';
import {JwtTokenDto} from '@app/auth/dto/jwt-token.dto';
import {AuthRequest} from '@app/auth/auth-request';
import {AccessTokenDto} from '@app/auth/dto/access-token.dto';
import {ConfigService} from '@app/shared/config.service';
import {UserEntity} from '@app/orm/entities/user.entity';

export class UserNotFound extends Error {

    constructor(message?: string){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export class PasswordIncorrect extends Error {
    constructor(message?: string){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

@Injectable()
export class AuthService {

    private readonly jwtExpiresIn: number;
    private readonly jwtSecret: string;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly configService: ConfigService
    ) {
        this.jwtExpiresIn = configService.config.get('jwt.expiresIn');
        this.jwtSecret = configService.config.get('jwt.secret');
    }

    async authenticate(request: AuthRequest): Promise<AccessTokenDto | UserNotFound | PasswordIncorrect> {

        const {email, password, type} = request;

        switch (type) {

            case 'userpass':

                const user = await this.userRepository
                    .createQueryBuilder('u')
                    .select(['u.id', 'u.password'])
                    .where('u.email = :email')
                    .setParameters({email})
                    .getOne();

                if (!user) return new UserNotFound();

                const checkPassword = await user.checkPassword(password!);
                if (!checkPassword) return new PasswordIncorrect();

                return this.createToken(user.id);

            default:
                throw new Error(`Unhandled request type: ${request.type}`);
        }
    }

    async createToken(id: number, expiresInSeconds?: number): Promise<AccessTokenDto> {

        const user = await this.userRepository.findOne(id);

        const {firstName, familyName} = user!;

        const   expiresIn = expiresInSeconds || this.jwtExpiresIn,
                secretOrKey = this.jwtSecret;

        const token = jwt.sign({sub: id, firstName, familyName}, secretOrKey, {expiresIn});

        return new AccessTokenDto({
            id: token,
            expiresIn,
            user,
        });
    }

    async validateUser(payload: JwtTokenDto): Promise<boolean> {

        const {sub} = payload;

        const count = await this.userRepository.count({id: sub});
        return count === 1;
    }

}
