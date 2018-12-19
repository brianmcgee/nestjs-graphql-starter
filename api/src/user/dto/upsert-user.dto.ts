import {IsEmail, IsNotEmpty, MaxLength} from 'class-validator';
import {assignClean} from '@app/shared/utils';
import {UpsertUser} from '@app/graphql/schema';

export class UpsertUserDto extends UpsertUser {

    constructor(data: any) {
        super();
        assignClean(this, data);
    }

    @IsEmail({}, {groups: ['registration', 'update']})
    @MaxLength(128, {groups: ['registration', 'update']})
    @IsNotEmpty({groups: ['registration', 'update']})
    email?: string;

    @MaxLength(64, {groups: ['registration', 'update']})
    @IsNotEmpty({groups: ['registration', 'update']})
    firstName?: string;

    @MaxLength(128, {groups: ['registration', 'update']})
    @IsNotEmpty({groups: ['registration', 'update']})
    familyName?: string;

    @MaxLength(128, {groups: ['registration']})
    @IsNotEmpty({groups: ['registration']})
    password?: string;

}
