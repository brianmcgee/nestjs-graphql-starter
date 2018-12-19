import {User} from '@app/graphql/schema';
import {assignClean} from '@app/shared/utils';

export class UserDto extends User {

    constructor(data: any) {
        super();
        assignClean(this, data);
    }

}
