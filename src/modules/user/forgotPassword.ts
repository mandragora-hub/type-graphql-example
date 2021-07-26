import { User } from '../../entity/user';
import { redis } from '../../redis';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { v4 } from 'uuid';
import { forgotPasswordPrefix } from '../constant/redisPrefixes';
import { sendEmail } from './utils/sendMail';

@Resolver()
export class ForgotPasswordResolver {

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string) {

        const user = await User.findOne({ where: { email } });
        if (!user) { return true; }

        const token = v4();
        await redis.set(forgotPasswordPrefix + token, user.id, "EX", 300000); //1 day expiration

        await sendEmail(
            email,
            `http://localhost:4000/user/change-password/${token}`);

        return true;
    }
}


