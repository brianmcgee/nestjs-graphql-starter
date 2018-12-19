import {Module} from '@nestjs/common';
import {UserEntity} from '../orm/entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from './user.service';
import {UserResolvers} from './user.resolvers';
import {AuthService} from '@app/auth/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [ UserService, UserResolvers ],
    exports: [ UserService ]
})
export class UserModule {
}
