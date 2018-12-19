export class UpsertUser {
    email?: string;
    firstName?: string;
    familyName?: string;
    password?: string;
}

export class AccessToken {
    id?: string;
    expiresIn?: number;
    user?: User;
}

export abstract class IMutation {
    abstract authenticateWithEmail(email: string, password: string): AccessToken | Promise<AccessToken>;

    abstract resetPassword(password: string): boolean | Promise<boolean>;

    abstract createUser(user?: UpsertUser): User | Promise<User>;

    abstract updateUserById(id: string, user?: UpsertUser): User | Promise<User>;

    abstract deleteUserById(id: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract users(offset?: number, limit?: number, q?: string): User[] | Promise<User[]>;

    abstract usersCount(offset?: number, limit?: number, q?: string): number | Promise<number>;

    abstract user(id: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id?: string;
    email?: string;
    firstName?: string;
    familyName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Date = any;
export type JSON = any;
