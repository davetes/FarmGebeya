"use client";

import React from "react";
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className=" flex items-center justify-center h-screen flex-col bg-gray-200 ">
      <h1 className="items-center text-5xl text-shadow-black">Sign up</h1>{" "}
      <br />
      <form className=" p-1 m-2 w-[500] h-[550] bg-white rounded-2xl ">
        {/* fullname */}

        <div className="border-1 hover:border-2 m-2 mb-3 ">
          <label>fullname</label>
          <input
            type="text"
            className="bg-transparent w-full border-none focus:outline-none pb-1 text-2xl"
          />
        </div>
        {/* email */}
        <div className="border-1 hover:border-2  m-2 mb-3  ">
          <label htmlFor="email">email</label>
          <br />
          <input
            type="email"
            id="email"
            className="w-full border-none text-2xl bg-transparent focus:outline-none "
          />{" "}
          <br />
        </div>

        {/* pas
       sword create */}

        <div className="border-1 hover:border-2 m-2 mb-3 ">
          <label htmlFor="pass">newpassword</label> <br />
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              className="border-none focus:outline-none bg-transparent w-full text-2xl"
            />{" "}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* confirm password */}
        <div className="border-1 hover:border-2 m-2 mb-3">
          <label htmlFor="pass">confirm password</label> <br />
          <div className="flex">
            <input
              type="password"
              id="pass"
              className="w-full border-none focus:outline-none bg-transparent text-2xl rounded-2xl"
            />{" "}
            <br />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>
        {/* button */}
        <div className=" flex items-center justify-center m-2 ">
          <input
            type="submit"
            value="Register"
            className="items-center cursor-pointer border-1 w-full h-15 text-5xl bg-red-500 text-white"
          />
        </div>

        {/* if already singin go to singin page */}

        <div className="flex items-center justify-center m-4">
          <button>
            <Link href={"/controller/login"}>Already have an account?</Link>
          </button>
        </div>
        {/* other methods */}
        <div className="flex items-center justify-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* links for google or apple tweeter */}
        <div className="flex  space-x-4">
          <div className="flex-1 flex justify-center ">
            <a href="https://www.google.com" target="_black">
              <Image
                src="/google-icon.svg"
                alt="google"
                height={50}
                width={50}
              />
            </a>
          </div>
          <div className="flex-1 flex justify-center  ">
            <Image
              src="/facebook.svg"
              alt="facebook"
              height={50}
              width={50}
              className="border-r-0 "
            />
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/x-icon.svg"
              alt="twitter"
              height={50}
              width={50}
              className=""
            />
          </div>
          <div className="flex-1 flex justify-center  ">
            <Image src="/apple-icon.svg" alt="apple" height={50} width={50} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
