import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from './user.service';
import {UseGuards, ValidationPipe} from '@nestjs/common';
import {UpsertUserDto} from './dto/upsert-user.dto';
import {UserDto} from '@app/user/dto/user.dto';
import {UserEntity} from '@app/orm/entities/user.entity';
import {JwtAuthGuard} from '@app/auth/guards/jwt-auth.guard';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserResolvers {

    constructor(private readonly userService: UserService) {}

    @Query()
    async users(@Args('offset') offset: number,
                @Args('limit') limit: number,
                @Args('q') q: string) {
        const entities = await this.userService.find({ offset, limit, q });
        return entities.map(e => new UserDto(e));
    }

    @Query()
    async usersCount(@Args('offset') offset: number,
                     @Args('limit') limit: number,
                     @Args('q') q: string) {
        return await this.userService.count({ offset, limit, q });
    }

    @Query()
    async user(@Args('id') id: number) {
        const entity = await this.userService.findById(id);
        return entity ? new UserDto(entity) : null;
    }

    @Mutation()
    async createUser(@Args('user', new ValidationPipe({ groups: ['registration']})) dto: UpsertUserDto) {
        const entity = new UserEntity(dto);
        return new UserDto(await this.userService.create(entity));
    }

    @Mutation()
    async updateUserById(@Args('id') id: number,
                         @Args('user', new ValidationPipe({ groups: ['update']})) dto: UpsertUserDto) {
        const entity = new UserEntity(dto);
        return new UserDto(await this.userService.updateById(id, entity));
    }

    @Mutation()
    async deleteUserById(@Args('id') id: number) {
        return await this.userService.deleteById(id);
    }

}
