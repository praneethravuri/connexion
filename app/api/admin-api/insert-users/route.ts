import User, { IUserDocument } from "@/models/userModel";
import { connectToDB } from "@/lib/connectDB";

export async function POST(req: Request) {
    await connectToDB(); // Ensure the database connection is established

    console.log("here to insert fake data");

    try {
        // Assuming the body of the request contains an array of user data
        const userDataArray: IUserDocument[] = await req.json();

        console.log("User Data: ", userDataArray);

        // Using the User model to create new user documents in the database
        const newUsers = await User.insertMany(userDataArray);

        // Successfully created the users, sending back a success response
        return new Response(JSON.stringify({ message: "Users Created", userDetails: newUsers }), { status: 201 });
    } catch (err) {
        console.error("Error inserting user data:", err);

        // Sending back an error response
        return new Response(JSON.stringify({ message: "Error creating users", err }), { status: 500 });
    }
}