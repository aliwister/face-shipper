import { useState } from "react";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import LoginForm from "../components/Login/Form";
import fetchJson from "../lib/fetchJson";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "lib/session/lib";
import {router} from "next/client";
import {useRouter} from "next/router";

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter()
  const { redirect, ...query } = router.query;

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      await mutateUser(
          await fetchJson("/api/login", {
            method: "POST",
            body: JSON.stringify(body),
          }),
      );
      if (!!redirect){
        const redirectUrl = `${redirect}?${new URLSearchParams(query).toString()}`;
        await router.push(redirectUrl);
        return
      }
      await router.push('/');

    } catch (error: any) {
      setErrorMsg(error.data.detail);
    }
  }

  return (
    <Layout>
      <div>
        <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default Login;

export const getServerSideProps = async function ({ req, res }) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  if (session.username) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
