"use server";

import { getIronSession } from "iron-session"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { loginHandler } from "@/app/api/auth-api/login-api/loginHandler";
import { signUpHandler } from "@/app/api/auth-api/signup-api/signUpHandler";
import { deleteHandler } from "@/app/api/auth-api/delete-user-api/deleteHandler";

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

    console.log("Actions.ts result: ", result);

    if (result.message === 'Login successful') {
      session.email = result.userDetails.email;
      session.userName = result.userDetails.userName;
      session.phoneNumber = result.userDetails.phoneNumber;
      session.createdAt = result.userDetails.createdAt;
      session.updatedAt = result.userDetails.updatedAt;
      session.fullName = result.userDetails.name;
      session.password = result.userDetails.password;
      session.userId = result.userDetails.userId;
      session.isLoggedIn = true;
      console.log("Actions.ts", result.userDetails.userName);
      await session.save();

      if (session.email === "admin@connexion.com") {
        redirect("/admin");
      }
      else {
        redirect("/homepage");
      }


    } else {
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

export const signUp = async (formData: { name: string, email: string, password: string, phoneNumber: string, userName: string }) => {
  const session = await getSession();
  const { name, email, password, phoneNumber, userName } = formData;

  try {
    const result = await signUpHandler(name, email, password, phoneNumber, userName);

    if (result.message === "success") {
      console.log("User created!");
      session.email = result.userDetails.email!;
      session.userName = result.userDetails.userName!;
      session.phoneNumber = result.userDetails.phoneNumber!;
      session.createdAt = result.userDetails.createdAt!;
      session.updatedAt = result.userDetails.updatedAt!;
      session.fullName = result.userDetails.name!;
      session.password = result.userDetails.password!;
      session.isLoggedIn = true;
      console.log("Signup result: ", result);
      await session.save();
      return result.message
    }
    else {
      return result.message
    }
  } catch (error) {
    console.error('Error:', error);
    return 'An unexpected error occurred. Please try again.';
  }
}

export const deleteAccount = async () => {
  const session = await getSession();
  const email = session.email;

  if (!email) {
    throw new Error('User email not found in session');
  }

  try {
    const result = await deleteHandler(email);

    if (result.message === 'User deleted successfully') {
      await session.destroy();
      redirect('/login');
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};