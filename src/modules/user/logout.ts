import { MyContext } from 'src/types/MyContext';
import { Resolver, Mutation, Ctx } from 'type-graphql';

@Resolver()
export class LogoutResolver {

    @Mutation(() => Boolean, { nullable: true })
    async logout(
        @Ctx() ctx: MyContext) {
        return new Promise((res, rej) => {
            ctx.req.session!.destroy((err) => {
                if (err) {
                    console.log(err);
                    return rej(false)
                }
                
                ctx.res.clearCookie('qid')
                return res(true);
            })
        })
    }
}
