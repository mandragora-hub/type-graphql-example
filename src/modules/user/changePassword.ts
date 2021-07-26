import { User } from '../../entity/user';
import { redis } from '../../redis';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { forgotPasswordPrefix } from '../constant/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';

import bcrypt from 'bcryptjs';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver {

    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput, @Ctx() ctx: MyContext): Promise<User | null> {

        const userId = await redis.get(forgotPasswordPrefix + token);
        if (!userId) { return null; }

        const user = await User.findOne(userId);
        if (!user) { return null; }

        user.password = await bcrypt.hash(password, 12);
        await redis.del(forgotPasswordPrefix + token);
        await user.save();

        // login the user
        ctx.req.session!.userId = user.id;

        return user;

    }
}


