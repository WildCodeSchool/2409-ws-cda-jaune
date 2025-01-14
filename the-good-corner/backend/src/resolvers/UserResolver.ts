import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Response } from "express";

@InputType()
class NewUserInput {
  @Field()
  name!: string;

  @Field()
  mail!: string;

  @Field()
  password!: string;
}

@InputType()
class UserInput {
  @Field()
  mail!: string;

  @Field()
  password!: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    const users = await User.find();
    return users;
  }

  @Mutation(() => String)
  async signup(
    @Arg("data") userData: NewUserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) throw new Error("Missing env variable");

    const hashedPassword = await argon.hash(userData.password);
    const user = await User.save({
      mail: userData.mail,
      hashedPassword: hashedPassword,
      name: userData.name,
    });

    const tokenContent = {
      mail: user.mail,
      name: user.name,
    };
    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const profile = {
      mail: user.mail,
      name: user.name,
    };
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async login(
    @Arg("data") userData: UserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.JWT_SECRET) throw new Error("Missing env variable");

    // Identification: est-ce que j'ai un User correspondant ?
    const user = await User.findOneByOrFail({ mail: userData.mail });

    // Authentification: est-ce que j'ai le bon password ?
    const isValid = await argon.verify(user.hashedPassword, userData.password);
    if (!isValid) throw new Error("Wrong password");

    // Tout est ok
    const tokenContent = {
      mail: user.mail,
      name: user.name,
    };
    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const profile = {
      mail: user.mail,
      name: user.name,
    };
    return JSON.stringify(profile);
  }
}
