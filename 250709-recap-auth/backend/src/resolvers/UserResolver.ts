import * as dotenv from "dotenv";
import { Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

dotenv.config();

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  getAllUsers() {
    return User.find();
  }
}

export default UserResolver;
