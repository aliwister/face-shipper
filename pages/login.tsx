import React, { useState } from "react";
import useUser from "../lib/useUser";
import Layout from "../components/Layout";
import LoginForm from "../components/Login/Form";
import fetchJson from "../lib/fetchJson";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "lib/session/lib";
import {router} from "next/client";
import {useRouter} from "next/router";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter()
  const { redirect, ...query } = router.query;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
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
        // @ts-ignore
        const redirectUrl = `${redirect}?${new URLSearchParams(query).toString()}`;
        await router.push(redirectUrl);
        return
      }
      await router.push('/');

    } catch (error: any) {
      console.log(error)
      setErrorMsg('Bad Credentials');
    } finally {
      setLoading(false)
    }
  }


  return (
    <Layout>
      <div>
        {errorMsg && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {errorMsg}
            </div>
        )}
        <LoginForm// @ts-ignore
            loading={loading} setErrorMsg={setErrorMsg} onSubmit={handleSubmit} />
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
