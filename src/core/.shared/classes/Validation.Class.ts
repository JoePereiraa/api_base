import { ZodError } from "zod";

class Validation extends Error {
    details: Record<string, string[]>;

    constructor(errors: ZodError) {
        super('Validation failed');

        this.details = errors.errors.reduce((acc, err) => {
            const path = err.path.join('.') || 'unknown_field';
            acc[path] = acc[path] || [];
            acc[path].push(err.message);
            return acc;
        }, {} as Record<string, string[]>);
    }
}

export {
    Validation
}