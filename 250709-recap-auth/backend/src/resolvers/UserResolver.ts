import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Role, User } from "../entities/User";
import type { AnonContext } from "../types/ApolloContext";

dotenv.config();

function getPublicProfile(user: User) {
  return {
    name: user.name,
  };
}

function setAuthCookie(user: User, context: AnonContext) {
  // checks
  if (!process.env.JWT_SECRET) throw new Error("Missing env: JWT_SECRET !");

  const tokenContent = {
    id: user.id,
    roles: user.roles,
  };
  const token = jwt.sign(tokenContent, process.env.JWT_SECRET);
  const now = new Date();
  const expirationTstamp = now.getTime() + 1000 * 60 * 60 * 24;
  now.setTime(expirationTstamp);
  context.res.setHeader(
    "Set-Cookie",
    `roleetAuthToken=${token};secure;httpOnly;ameSite=Strict;expires=${now.toUTCString()}`
  );
}

@InputType()
class NewUserInput {
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
class UserInput {
  @Field()
  mail: string;

  @Field()
  password: string;
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
    const hashedPassword = await argon2.hash(userData.password);
    const user = await User.save({
      hashedPassword: hashedPassword,
      mail: userData.mail,
      name: userData.name,
      roles: [Role.USER],
    });

    // Renvoyer un profil public
    const profileContent = getPublicProfile(user);

    // Créer un jwt
    setAuthCookie(user, context);
    return JSON.stringify(profileContent);
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: UserInput, @Ctx() context: AnonContext) {
    const user = await User.findOneBy({ mail: userData.mail });
    if (!user) throw new Error("User not found");

    const isValid = await argon2.verify(user.hashedPassword, userData.password);
    if (!isValid) throw new Error("Wrong password");

    // Renvoyer un profil public
    const profileContent = getPublicProfile(user);

    // Créer un jwt
    setAuthCookie(user, context);
    return JSON.stringify(profileContent);
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUser(@Arg("userId") id: String) {
    return id;
  }
}

export default UserResolver;
