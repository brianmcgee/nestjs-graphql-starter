import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsDefined, IsEmail, IsIn, Length, ValidateIf} from 'class-validator';

export class AuthRequest {

    @IsIn(['userpass'])
    @ApiModelProperty({ type: 'string' })
    readonly type: string;

    @ValidateIf(r => r.type === 'userpass')
    @IsEmail()
    @IsDefined()
    @ApiModelPropertyOptional({ type: 'string' })
    readonly email?: string;

    @ValidateIf(r => r.type === 'userpass')
    @Length(3, 30)
    @IsDefined()
    @ApiModelPropertyOptional({ type: 'string' })
    readonly password?: string;
}
