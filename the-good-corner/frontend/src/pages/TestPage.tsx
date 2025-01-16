import { FormEvent } from "react";
import {
  useLoginMutation,
  UserInput,
} from "../libs/graphql/generated/graphql-types";

export default function TestPage() {
  const [login] = useLoginMutation();

  const hLogin = async (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson);
    const userData = await login({
      variables: { data: formJson as UserInput },
    });
    console.log(userData);
  };

  return (
    <>
      <h1>I iz TestPage</h1>
      <section>
        <h2>Login form</h2>
        <form onSubmit={hLogin}>
          <label>
            Email
            <input type="text" name="mail" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Login" />
        </form>
      </section>
    </>
  );
}
