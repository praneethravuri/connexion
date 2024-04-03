import { connectToDB } from "@/lib/connectDB";
import User from "@/models/userModel";

export async function deleteHandler(email: string) {
  try {
    await connectToDB(); // Assuming you have a function to connect to the database
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return { message: 'User not found' };
    }

    return { message: 'User deleted successfully' };
  } catch (err) {
    console.error(err);
    return { message: 'Server error' };
  }
}