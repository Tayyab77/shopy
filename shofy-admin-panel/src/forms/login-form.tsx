"use client"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { notifyError, notifySuccess } from "@/utils/toast";
import { useLoginAdminMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
  //Here, you're sending your "request" to log in by calling the loginAdmin function.
  //The loginAdmin is action is like telling the librarian, "Hey, I want to enter!"
  const [loginAdmin, {data:loginData}] = useLoginAdminMutation();
  const router = useRouter();
  // react hook form  
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit =async (data: { email: string; password: string }) => {
 //loginAdmin({ username, password }) triggers the action in Redux and will hig authApi.ts 
 //file It initiates the process
//sending a request to log in, just like handing your library card to the librarian.
//In this case, loginAdmin is the action, and it exists in the file login-form.tsx.
    const res = await loginAdmin({ email: data.email, password: data.password });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Login successfully");
      router.push('/dashboard')
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Email <span className="text-red">*</span>
        </p>
        <input
          {...register("email", { required: `Email is required!` })}
          name="email"
          id="email"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="email"
          placeholder="Enter Your Email"
        />
        <ErrorMsg msg={errors.email?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Password <span className="text-red">*</span>
        </p>
        <input
          {...register("password", { required: `Password is required!` })}
          id="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="password"
          placeholder="Password"
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="flex items-center justify-between">
        <div className="tp-checkbox flex items-start space-x-2 mb-3">
          <input id="product-1" type="checkbox" />
          <label htmlFor="product-1" className="text-tiny">
            Remember Me
          </label>
        </div>
        <div className="mb-4">
          <a
            href="forgot.html"
            className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
          >
            Forgot Password ?
          </a>
        </div>
      </div>
      <button type="submit" className="tp-btn h-[49px] w-full justify-center">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
