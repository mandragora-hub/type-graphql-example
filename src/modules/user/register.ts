import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcryptjs from 'bcryptjs';
import { User } from '../../entity/user';
import { RegisterInput } from '../user/register/RegisterInput';

@Resolver()
export class RegisterResolver {
    // private recipesCollection: Recipe[] = [];

    @Query(() => String)
    async hello() {
        return "Hello World";
    }

    @Mutation(() => User)
    async register(
        @Arg("data") { email, firstName, lastName, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword }).save();

        return user;
    }
}


