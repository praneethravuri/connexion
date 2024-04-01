import User from "../../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function signUpHandler(name: string, email: string, password: string, phoneNumber: string, userName: string) {
    await connectToDB();

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return {
                message: "duplicate",
                userDetails: {}
            };
        }

        const newUser = await User.create({ name, email, password, phoneNumber, userName });

        console.log(newUser);

        return {
            message: "user created",
            userDetails: {
                email: newUser.email || "",
                password: newUser.password || "",
                phoneNumber: newUser.phoneNumber || "",
                userName: newUser.userName || "",
                name: newUser.name || "",
                createdAt: newUser.createdAt || new Date(),
                updatedAt: newUser.updatedAt || new Date()
            }
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user");
    }
}