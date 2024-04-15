import User from "../../../../models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function signUpHandler(name: string, email: string, password: string, phoneNumber: string, userName: string) {
    await connectToDB();

    try {
        // Check if email is valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                message: "Invalid email format",
                userDetails: {}
            };
        }

        // Check if phone number is valid format
        const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return {
                message: "Invalid phone number format",
                userDetails: {}
            };
        }

        // Check if password contains name (for better security)
        if (password.includes(name)) {
            return {
                message: "Password cannot contain name",
                userDetails: {}
            };
        }

        // Check if password meets minimum requirements (e.g., length, complexity)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return {
                message: "Password is too weak. Please use a stronger password.",
                userDetails: {}
            };
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return {
                message: "Email already exists",
                userDetails: {}
            };
        }

        const newUser = await User.create({ name, email, password, phoneNumber, userName });

        return {
            message: "success",
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