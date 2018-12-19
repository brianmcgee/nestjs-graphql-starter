
import {createParamDecorator} from '@nestjs/common';

export const JwtToken = createParamDecorator((data, ctx) => {
    return ctx.user || ctx[2].user;     // handles normal and graphql contexts
});
