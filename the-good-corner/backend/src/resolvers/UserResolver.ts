import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import * as argon from "argon2";
import { User } from "../entities/User";

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
  async signup(@Arg("data") userData: NewUserInput) {
    const hashedPassword = await argon.hash(userData.password);
    const user = await User.save({
      mail: userData.mail,
      hashedPassword: hashedPassword,
      name: userData.name,
    });
    const profile = {
      mail: user.mail,
      name: user.name,
    };
    return JSON.stringify(profile);
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: UserInput) {
    // Identification: est-ce que j'ai un User correspondant ?
    const user = await User.findOneByOrFail({ mail: userData.mail });

    // Authentification: est-ce que j'ai le bon password ?
    const isValid = await argon.verify(user.hashedPassword, userData.password);
    if (!isValid) throw new Error("Wrong password");

    // Tout est ok
    const profile = {
      mail: user.mail,
      name: user.name,
    };
    return JSON.stringify(profile);
  }
}
