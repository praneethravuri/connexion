"use server";

import { getIronSession } from "iron-session"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { loginHandler } from "@/app/api/authApi/loginApi/loginHandler";
import { signUpHandler } from "@/app/api/authApi/signApi/signUpHandler";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}

export const login = async (formData: { email: string; password: string; }) => {
  const session = await getSession();
  const { email, password } = formData;

  try {
    const result = await loginHandler(email, password);

    if (result.message === 'Login successful') {
      console.log("Login successful actions.ts!");

      // Update the session with the user details
      session.email = result.userDetails.email;
      session.userName = result.userDetails.userName;
      session.phoneNumber = result.userDetails.phoneNumber;
      session.createdAt = result.userDetails.createdAt;
      session.updatedAt = result.userDetails.updatedAt;
      session.fullName = result.userDetails.name;
      session.password = result.userDetails.password;
      session.userId = result.userDetails.userId;
      session.isLoggedIn = true;

      console.log("Login result: ", result);

      await session.save();
      redirect("/homepage");
    } else {
      console.log("Invalid creds actions.ts!!!");
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const logout = async () => {

  const session = await getSession();
  session.destroy();
  redirect("/")

}

export const signUp = async (formData: { email: string, password: string, userName: string, phoneNumber: string, name: string }) => {
  const session = await getSession();
  const { email, password, userName, phoneNumber, name } = formData;

  try {
      const result = await signUpHandler(email, password, userName, phoneNumber, name);

      if (result.message === "user created") {
          console.log("User created!");
          session.email = result.userDetails.email;
          session.userName = result.userDetails.userName;
          session.phoneNumber = result.userDetails.phoneNumber;
          session.createdAt = result.userDetails.createdAt;
          session.updatedAt = result.userDetails.updatedAt;
          session.fullName = result.userDetails.name;
          session.password = result.userDetails.password;
          session.isLoggedIn = true;
          console.log("Signup result: ", result);
          await session.save();
          redirect("/homepage");
      } else if (result.message === "duplicate") {
          throw new Error('Email already exists');
      } else {
          console.log("Invalid details signup actions.ts!!!");
          throw new Error('Invalid details');
      }
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}