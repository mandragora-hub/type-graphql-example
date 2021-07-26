import { MyContext } from 'src/types/MyContext';
import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../entity/user';

@Resolver()
export class MeResolver {
    // private recipesCollection: Recipe[] = [];

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined;
        }

        return await User.findOne({ where: { id: ctx.req.session!.userId } });
    }
}


