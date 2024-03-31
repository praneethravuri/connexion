import User from "../../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function signUpHandler(email: string, password: string, phoneNumber: string, userName: string, name: string) {
    await connectToDB();

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return {
                message: "duplicate",
                userDetails: {}
            };
        }

        const newUser = await User.create({ email, password, phoneNumber, userName, name });

        return {
            message: "user created",
            userDetails: {
                email: newUser.email,
                password: newUser.password,
                phoneNumber: newUser.phoneNumber,
                userName: newUser.userName,
                name: newUser.name,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user");
    }
}