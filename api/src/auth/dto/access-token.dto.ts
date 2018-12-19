import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {AccessToken} from '@app/graphql/schema';
import {UserDto} from '@app/user/dto/user.dto';

export class AccessTokenDto extends AccessToken {

    constructor(data?: any) {
        super();
        Object.assign(this, data);
    }

    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    expiresIn: number;

    @ApiModelPropertyOptional()
    user?: UserDto;

}
