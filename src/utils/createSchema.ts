import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/changePassword";
import { ConfirmUserResolver } from "../modules/user/confirmUser";
import { ForgotPasswordResolver } from "../modules/user/forgotPassword";
import { LoginResolver } from "../modules/user/login";
import { LogoutResolver } from "../modules/user/logout";
import { MeResolver } from "../modules/user/me";
import { RegisterResolver } from "../modules/user/register";

export const createSchema = () =>
    buildSchema({
        resolvers: [
            ChangePasswordResolver,
            ConfirmUserResolver,
            ForgotPasswordResolver,
            LoginResolver,
            LogoutResolver,
            MeResolver,
            RegisterResolver
        ],
        authChecker: ({ context: { req } }) => {
            return !!req.session.userId;
        }
    });