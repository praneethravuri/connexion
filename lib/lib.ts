
import {SessionOptions} from "iron-session"

export interface SessionData {
    userId?: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
    isLoggedIn: boolean;
    email:string
  }
  
  export const defaultSession: SessionData = {
    fullName: '',
    password: '',
    phoneNumber: '',
    userName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isLoggedIn: false,
    email:"",
  }

export const sessionOptions:SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName : "connexion-session",
    cookieOptions : {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production"
    }
}