'use client';

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment, ReactElement, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa";
import clsx from "clsx";
import PageLoader from "@/components/PageLoader";
import { useLogin, useSocialLogin } from "./useLogin";

const Login: FC = (): ReactElement => {
  const [passwordType, setPasswordType] = useState<string>('password');
  const { loading, validationErrors, setValidationErrors, onLoginSubmit } = useLogin();
  const { loading: socialAuthLoading, authWithGoogle, authWithFacebook } = useSocialLogin();

  return (
    <div className="relative flex flex-col h-screen mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
      {socialAuthLoading && <PageLoader />}
      <form action={onLoginSubmit}>
        <div className="mt-12 w-full px-5">
          <div className="mb-5 flex flex-col justify-between text-gray-600">
            <Link href="/" className="w-24 flex mx-auto mb-4 cursor-pointer">
              <Image
                src="https://i.ibb.co/SBvxyHC/uptimer.png"
                alt="API Monitor"
                className="w-full"
                width={400}
                height={400}
                priority
              />
            </Link>
            <h1 className="flex w-full text-center justify-center text-3xl font-medium mb-2">
              Welcome Back
            </h1>
            <h5 className="flex w-full text-blue-400 text-center justify-center font-normal cursor-pointer hover:underline mb-2">
              <Link href="/create-account">Create an account</Link>
            </h5>
          </div>
          <Fragment>
            <label
              htmlFor="username"
              className="text-sm font-bold leading-tight tracking-normal text-gray-800"
            >
              Email or Username
            </label>
            <TextInput
              id="username"
              name="username"
              type="text"
              className={clsx(
                'mt-2 mb-5 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none',
                {
                  'border border-red-400': validationErrors!.username
                }
              )}
              placeholder="Enter username"
              onChange={() => {
                setValidationErrors!({...validationErrors!, username: '' });
              }}
            />
          </Fragment>
          <Fragment>
            <label
              htmlFor="password"
              className="text-sm font-bold leading-tight tracking-normal text-gray-800"
            >
              Password
            </label>
            <div className="relative mb-2 mt-2">
              <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                {passwordType === 'password' ? (
                  <FaEyeSlash onClick={() => setPasswordType('text')} className="icon icon-tabler icon-tabler-info-circle" />
                ) : (
                  <FaEye onClick={() => setPasswordType('password')} className="icon icon-tabler icon-tabler-info-circle" />
                )}
              </div>
              <TextInput
                id="password"
                name="password"
                type={passwordType}
                className={clsx(
                  'flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none',
                  {
                    'border border-red-400': validationErrors!.password
                  }
                )}
                placeholder="Enter password"
                onChange={() => {
                  setValidationErrors!({...validationErrors!, password: '' });
                }}
              />
            </div>
          </Fragment>
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-500 my-6 text-md block w-full cursor-pointer rounded px-8 py-2 text-center font-bold text-white hover:bg-green-400 focus:outline-none"
            label={`${loading ? 'LOGIN IN PROGRESS...' : 'LOGIN'}`}
          />
        </div>
      </form>
      <div className="px-5">
        <div className="relative flex pb-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-2">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <Button
          type="button"
          icon={<FaGoogle className="mr-2 -ml-1 w-4 h-4" />}
          className="text-md w-full cursor-pointer rounded px-8 py-2 text-center font-bold text-white inline-flex items-center justify-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:outline-none"
          label="Sign In with Google"
          onClick={authWithGoogle}
        />
        <Button
          type="button"
          icon={<FaFacebookF className="mr-2 -ml-1 w-4 h-4" />}
          className="text-md w-full mt-4 cursor-pointer rounded px-8 py-2 text-center font-bold text-white inline-flex items-center justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:outline-none"
          label="Sign In with Facebook"
          onClick={authWithFacebook}
        />
      </div>
    </div>
  );
};

export default Login;
