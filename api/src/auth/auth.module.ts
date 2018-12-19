import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../orm/entities/user.entity';
import {AuthService} from '@app/auth/auth.service';
import {JwtAuthGuard} from '@app/auth/guards/jwt-auth.guard';
import {AuthResolvers} from '@app/auth/auth.resolvers';
import {UserService} from '@app/user/user.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserService
    ],
    providers: [AuthService, JwtAuthGuard, AuthResolvers],
    exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {}
