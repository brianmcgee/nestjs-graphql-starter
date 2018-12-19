
export interface QueryFilter {

    offset: number;
    limit: number;
    q?: string;
    contentType?: string;
    name?: string;
}

export class QueryFilterModel {

    offset: number;
    limit: number;
    q?: string;
    name?: string;
    contentType?: string;

    constructor(data: any) {
        this.offset = data.offset ? +data.offset : 0;
        this.limit = data.limit ? +data.limit : 10;
        this.q = data.q;
        this.name = data.name;
        this.contentType = data.contentType;
    }

}

import {createParamDecorator} from '@nestjs/common';

export const QueryFilter = createParamDecorator((data, req) => {
    return new QueryFilterModel(req.query);
});
