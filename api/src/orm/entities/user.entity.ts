import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

import * as bcrypt from 'bcrypt';
import {assignClean} from '@app/shared/utils';

@Entity('user')
export class UserEntity {

    constructor(data: any) {
        assignClean(this, data);
    }

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 128})
    email: string;

    @Column({length: 128, select: false})
    password?: string;

    @Column({length: 64})
    firstName: string;

    @Column({length: 128})
    familyName: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password || '');
    }
}


