import { FormEvent } from "react";
import {
  useLoginMutation,
  UserInput,
} from "../libs/graphql/generated/graphql-types";

export default function LabPage() {
  const [login] = useLoginMutation();

  const hLogin = (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    login({ variables: { data: formJson as UserInput } });
  };

  return (
    <>
      <h1>I iz Lab !</h1>
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
      <section>
        <h2>other query</h2>
      </section>
    </>
  );
}
