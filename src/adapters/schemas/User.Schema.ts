import { z } from 'zod';
import { Validation } from '@core/.shared/classes/Validation.Class';

const UserBodySchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must have at least 1 character." })
        .max(50, { message: "Name must not exceed 50 characters." })
        .refine((value) => value.trim().length > 0, { message: "Name cannot be empty or whitespace only." }),
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(5, { message: "Password must have at least 5 characters." })
        .max(20, { message: "Password must not exceed 20 characters." }),
});

const UserSchema = (data: unknown) => {
    const _userSchema = UserBodySchema.safeParse(data);

    if(!_userSchema.success) {
        throw new Validation(_userSchema.error);
    }

    return _userSchema.data;
}


export {
    UserSchema,
}