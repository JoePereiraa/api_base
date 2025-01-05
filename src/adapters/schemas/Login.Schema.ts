import { z } from 'zod';
import { Validation } from '@core/.shared/classes/Validation.Class';

const UserBodySchema = z.object({
    email: z
        .string()
        .email(),
    password: z
        .string()
});

const LoginSchema = (data: unknown) => {
    const _userSchema = UserBodySchema.safeParse(data);

    if(!_userSchema.success) {
        throw new Validation(_userSchema.error);
    }

    return _userSchema.data;
}


export {
    LoginSchema,
}