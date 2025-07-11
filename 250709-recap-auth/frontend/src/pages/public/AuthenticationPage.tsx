import {
  useLoginMutation,
  useLogoutMutation,
  UserInput,
} from "@/lib/graphql/generated/graphql-types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { useCurrentUser, useLogin, useLogout } from "@/lib/zustand/userStore";
import { FormEvent } from "react";

export default function AuthenticationPage() {
  const [login] = useLoginMutation();
  const currentUser = useCurrentUser();
  const loginToStore = useLogin();
  const logoutToStore = useLogout();
  const [logout] = useLogoutMutation();

  const hLogin = async (evt: FormEvent) => {
    evt.preventDefault();
    const formdata = new FormData(evt.currentTarget as HTMLFormElement);
    const formJson = Object.fromEntries(formdata.entries());

    // console.log(formJson);
    const { data, errors } = await login({
      variables: { data: formJson as UserInput },
    });
    if (errors) throw new Error(errors.toString());
    if (!data)
      throw new Error("Should not happend: no error but no data on hLogin");

    loginToStore(data.login);
  };

  const hLogout = () => {
    logout();
    logoutToStore();
  };

  if (currentUser)
    return (
      <>
        <p>Hello {currentUser.name} !</p>
        <ul>
          {currentUser.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        {currentUser.roles.includes("ADMIN") && (
          <button>Make everything explode</button>
        )}
        <button onClick={hLogout}>Log out</button>
      </>
    );

  return (
    <>
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Se connecter</TabsTrigger>
          <TabsTrigger value="signup">S'inscrire</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={hLogin}>
            Email
            <input type="text" name="mail" />
            Password
            <input type="password" name="password" />
            <input type="submit" value="Login" />
          </form>
        </TabsContent>
        <TabsContent value="signup">{/* TODO */}</TabsContent>
      </Tabs>
    </>
  );
}
