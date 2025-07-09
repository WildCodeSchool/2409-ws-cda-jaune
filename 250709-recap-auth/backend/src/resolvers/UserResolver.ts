import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Role, User } from "../entities/User";
import { AnonContext } from "@/types/ApolloContext";

dotenv.config();

@InputType()
class NewUserInput {
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  getAllUsers() {
    return User.find();
  }

  @Mutation(() => String)
  async signup(
    @Arg("data") userData: NewUserInput,
    @Ctx() context: AnonContext
  ) {
    // checks
    if (!process.env.JWT_SECRET) throw new Error("Missing env: JWT_SECRET !");

    const hashedPassword = await argon2.hash(userData.password);
    const user = await User.save({
      hashedPassword: hashedPassword,
      mail: userData.mail,
      name: userData.name,
      roles: [Role.USER],
    });

    // Renvoyer un profil public
    const profileContent = {
      name: user.name,
    };

    // Créer un jwt
    const tokenContent = {
      id: user.id,
      roles: user.roles,
    };
    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);
    const expirationTimestamp = new Date().getTime() + 1000 * 60 * 60 * 24;
    const expirationDate = new Date().setTime(expirationTimestamp).toString();
    context.res.setHeader(
      "Set-Cookie",
      `roleetAuthToken=${token};secure;httpOnly;ameSite=Strict;expires=${expirationDate}`
    );

    return JSON.stringify(profileContent);
  }
}

export default UserResolver;
