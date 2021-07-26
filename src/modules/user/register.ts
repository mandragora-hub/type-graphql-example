import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcryptjs from 'bcryptjs';
import { User } from '../../entity/user';
import { RegisterInput } from '../user/register/RegisterInput';
import { isAuth } from '../middleware/isAuth';
import { logger } from '../middleware/logger';
import { sendEmail } from './utils/sendMail';
import { createConfirmationUrl } from './utils/createConfimationUrl';


@Resolver()
export class RegisterResolver {
    // private recipesCollection: Recipe[] = [];
    // @Authorized()
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("data") { email, firstName, lastName, password }: RegisterInput
    ): Promise<User> {
        console.log(password);
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log(hashedPassword);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword }).save();

        await sendEmail(user.email, await createConfirmationUrl(user.id));

        return user;
    }
}


