import {ValidationError} from 'class-validator/validation/ValidationError';

export class ApiValidationError extends Error {

    constructor(public readonly validationErrors: ValidationError[], message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }

}
