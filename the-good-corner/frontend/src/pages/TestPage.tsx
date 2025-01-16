import { FormEvent } from "react";
import {
  useLoginMutation,
  UserInput,
} from "../libs/graphql/generated/graphql-types";
import { useUserStore } from "../libs/zustand/userStore";

export default function TestPage() {
  const [login] = useLoginMutation();
  const currentUser = useUserStore((state) => state.user);
  const setUserToStore = useUserStore((state) => state.login);

  const hLogin = async (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const { data } = await login({
      variables: { data: formJson as UserInput },
    });

    if (!data) return;
    const profile = JSON.parse(data.login);
    setUserToStore(profile);
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
      <section>Current user: {currentUser?.name || "Stranger"}</section>
    </>
  );
}
