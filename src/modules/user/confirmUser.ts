import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/user';
import { redis } from '../../redis';

@Resolver()
export class ConfirmUserResolver {

    @Mutation(() => Boolean, { nullable: true })
    async confirm(
        @Arg("token") token: string): Promise<Boolean> {
        const userId = await redis.get(token);

        if (!userId) { return false }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        redis.del(token);
        
        return true;
    }
}


