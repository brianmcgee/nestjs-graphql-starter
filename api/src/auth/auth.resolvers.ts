import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from '@app/auth/auth.service';
import {ApiValidationError} from "@app/shared/validation.errors";
import {UseGuards} from "@nestjs/common";
import {AccessTokenDto} from '@app/auth/dto/access-token.dto';
import {UserEntity} from '@app/orm/entities/user.entity';
import {JwtAuthGuard} from '@app/auth/guards/jwt-auth.guard';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UserService} from '@app/user/user.service';

@Resolver('Auth')
export class AuthResolvers {

    constructor(private readonly authService: AuthService,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,) {}

    @Mutation()
    async authenticateWithEmail(@Args('email') email: string,
                                @Args('password') password: string) {

        const result = await this.authService.authenticate({ type: 'userpass', email, password });

        if(result instanceof AccessTokenDto) {
            return result;
        }

        throw new ApiValidationError([{
            property: 'userpass',
            constraints: {
                userpass: 'Email or password is incorrect'
            },
            children: []
        }]);
    }

    @Mutation()
    @UseGuards(JwtAuthGuard)
    async resetPassword(@Args('password') password: string,
                        @Context('user') user: UserEntity) {

        const { id } = user;

        const count = await this.userRepository.count({ id });
        if (count === 0) return undefined;

        await UserService.hashPasswordIfSet(user);

        user.updatedAt = new Date();

        await this.userRepository.update(id, user);

        return true;
    }

}

