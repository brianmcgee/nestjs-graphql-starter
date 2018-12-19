import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {QueryFilter} from '@app/shared/query-filter';
import {UserEntity} from '@app/orm/entities/user.entity';

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async find(filter: QueryFilter): Promise<UserEntity[]> {

        const { offset, limit, q} = filter;

        const builder = this.userRepository.createQueryBuilder('u');

        if (q) {
            builder
                .where('u.firstName ~* :query')
                .orWhere('u.family_name ~* :query')
                .setParameters({ query: `.*${q}.*` });
        }

        return await builder
            .offset(offset)
            .limit(limit)
            .orderBy('id', 'ASC')
            .getMany();
    }

    async count(filter: QueryFilter): Promise<number> {

        const {q} = filter;

        const builder = this.userRepository.createQueryBuilder('u');

        if (q) {
            builder
                .where('u.firstName ~* :query')
                .orWhere('u.family_name ~* :query')
                .setParameters({ query: `.*${q}.*` });
        }

        return await builder
            .orderBy('id', 'ASC')
            .getCount();
    }

    async create(user: UserEntity): Promise<UserEntity> {
        await UserService.hashPasswordIfSet(user);
        return this.userRepository.save(user);
    }

    async exists(email: string): Promise<boolean> {
        const count = await this.userRepository.count({ email });
        return count === 0;
    }

    async findById(id: number): Promise<UserEntity | undefined> {
        return this.userRepository.findOne(id);
    }

    async updateById(id: number, user: UserEntity): Promise<UserEntity | undefined> {
        const count = await this.userRepository.count({ id });
        if (count === 0) return undefined;

        await UserService.hashPasswordIfSet(user);

        user.updatedAt = new Date();

        await this.userRepository.update(id, user);

        return await this.findById(id);
    }

    async deleteById(id: number): Promise<boolean> {

        const count = await this.userRepository.count({ id });

        if (count === 0) return false;

        await this.userRepository.delete(id, { });

        return true;
    }

    static async hashPasswordIfSet(user: UserEntity): Promise<UserEntity> {
        console.log('Hash password if set', user);
        const {password} = user;
        if (password) {
            user.password = await bcrypt.hash(password, saltRounds);
        }
        return user;
    }

    static checkPassword(user: UserEntity, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password || '');
    }
}
