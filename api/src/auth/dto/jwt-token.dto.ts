
export class JwtTokenDto {

    // custom fields

    readonly username: string;
    readonly email: string;
    readonly roleId: number;
    readonly magazineIds: number[];

    // standard fields

    readonly sub: number;
    readonly iat: number;
    readonly exp: number;

}
